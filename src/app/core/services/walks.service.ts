import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Pet } from '../interfaces/pet.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalksService {

  private readonly http = inject( HttpClient );
  private readonly baseUrl: string = environment.baseUrl;

  constructor() {}

  onSave( body: Pet ) {
    const url = `${ this.baseUrl }/walks`;
    return this.http.post<Pet>( url, body );
  }

  findAllPets(): Observable<Pet[]> {
    const url = `${ this.baseUrl }/walks`;
    return this.http.get<Pet[]>( url );
  }

  deletePet( id: string ) {
    const url = `${ this.baseUrl }/walks/${ id }`;
    return this.http.delete<Pet>( url );
  }

  addWalk( id: string, walk: string ) {
    const url = `${ this.baseUrl }/walks/${ id }/addWalk`;
    return this.http.patch<Pet>( url, { walk } );
  }
}