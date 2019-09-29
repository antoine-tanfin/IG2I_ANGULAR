import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


import {  } from '../pokemons/pokemons.module';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PageData, Pokemon } from './pokemon.model';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  pokeURL = `${environment.pokemonUrl}/pokemons`;

  constructor(private http: HttpClient) { }  

  getPokemonDetails(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.pokeURL}/${id}`);
  }

  getPokemonsData(offset : number, limit : number): Observable<PageData> {
    return this.http.get<PageData>(`${this.pokeURL}?offset=${offset}&limit=${limit}`);
  }
}
