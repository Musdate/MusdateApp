import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Pet, UpdatePet, Walk, WalksPrice } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalksService {

  private readonly http = inject( HttpClient );
  private readonly baseUrl: string = environment.baseUrl;

  constructor() {}

  onSavePet( userId: string, body: Pet ) {
    const url = `${ this.baseUrl }/walks/addPet/${ userId }`;
    return this.http.post<Pet>( url, body );
  }

  findAllPets( userId: string ): Observable<Pet[]> {
    const url = `${ this.baseUrl }/walks/getAllPets/${ userId }`;
    return this.http.get<Pet[]>( url );
  }

  updatePet( petId: string, body: UpdatePet ): Observable<Pet[]> {
    const url = `${ this.baseUrl }/walks/updatePet/${ petId }`;
    return this.http.patch<Pet[]>( url, body );
  }

  deletePet( id: string ) {
    const url = `${ this.baseUrl }/walks/deletePet/${ id }`;
    return this.http.delete<Pet>( url );
  }

  addWalk( id: string, walk: Walk ) {
    const url = `${ this.baseUrl }/walks/addWalk/${ id }`;
    return this.http.patch<Pet>( url, walk );
  }

  addWalksPrice( userId: string , body: WalksPrice ) {
    const url = `${ this.baseUrl }/walks/addWalksPrice/${ userId }`;
    return this.http.post<WalksPrice>( url, body );
  }

  findWalksPrice( userId: string ) {
    const url = `${ this.baseUrl }/walks/getWalksPrice/${ userId }`;
    return this.http.get<WalksPrice>( url );
  }
}