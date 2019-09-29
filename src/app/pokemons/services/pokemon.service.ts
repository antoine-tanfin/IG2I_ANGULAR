import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


import {  } from '../pokemons.module';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PageData, Pokemon } from './pokemon.model';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  pokeURL = `${environment.pokemonUrl}/pokemons`;

  constructor(private http: HttpClient) { }  

  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.pokeURL}/${id}`);
  }

  getPokemonsData(offset : number, limit : number): Observable<PageData> {
    return this.http.get<PageData>(`${this.pokeURL}?offset=${offset}&limit=${limit}`);
  }

  getPokemonByString(
    search: string,
    offset: number = 0,
    limit: number = 10
  ): Observable<PageData> {
    
    const url = this.pokeURL + `?search=${search}&offset=${offset}&limit=${limit}`;
    
    return this.http.get<PageData>(`${url}`).pipe(
        tap(() => {
          this._log("Searched Pokemons");
        })
      ).pipe(
        catchError(this.handleError<PageData>("searchPokemons", null))
      );
  }

  private _log(message: string) {
    console.log(`PokemonService : ${message}`);
  }

  private handleError<T>(operation = "operation", result?: T) {
    
    return (error: any): Observable<T> => {
      console.error(error); // log to console
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
