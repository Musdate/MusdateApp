import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';

import {
  AuthStatus,
  CheckTokenResponse,
  CreateUser,
  LoginResponse,
  UpdateUser,
  User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject( HttpClient );
  private readonly baseUrl: string = environment.baseUrl;

  private readonly _currentUser = signal<User|null>( null );
  private readonly _authStatus  = signal<AuthStatus>( AuthStatus.checking );

  public currentUser = computed( () => this._currentUser() );
  public authStatus  = computed( () => this._authStatus() );

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication( user: User, token: string ): boolean {
    this._currentUser.set( user );
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem('token', token);
    return true;
  }

  checkAuthStatus(): Observable<boolean> {
    const url   = `${ this.baseUrl }/auth/check-token`;
    const token = localStorage.getItem( 'token' );

    if ( !token ) {
      this.logout();
      return of( false );
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${ token }`);

    return this.http.get<CheckTokenResponse>( url, { headers } ).pipe(
        map(({ user, token }) => this.setAuthentication( user, token )),
        catchError(() => {
          this._authStatus.set( AuthStatus.notAuthenticated );
          return of( false );
        })
      );
  }

  register( user: CreateUser ): Observable<boolean> {
    const url = `${ this.baseUrl }/auth/register`;

    return this.http.post<LoginResponse>( url, user ).pipe(
      map(({ user, token }) => this.setAuthentication( user, token )),
      catchError(( err ) => throwError(() => err.error.message ))
    );
  }

  updateUser( userId: string, body: UpdateUser ): Observable<User> {
    const url = `${ this.baseUrl }/auth/updateUser/${ userId }`;
    return this.http.patch<User>( url, body ).pipe(
      map(( updatedUser ) => {
        this._currentUser.set( updatedUser);
        return updatedUser;
      }),
      catchError(( error ) => throwError(() => error.error.message ))
    );
  }

  login( email: string, password: string ): Observable<boolean> {
    const url = `${ this.baseUrl }/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>( url, body ).pipe(
      map(({ user, token }) => this.setAuthentication( user, token )),
      catchError(( err ) => throwError(() => err.error.message ))
    );

  }

  logout() {
    localStorage.removeItem( 'token' );
    this._currentUser.set( null );
    this._authStatus.set( AuthStatus.notAuthenticated );
  }
}