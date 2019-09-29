import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PageData } from '../services/pokemon.model';
import { PokemonService } from '../services/pokemon.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pageData: PageData;

  @Output() itemChanged = new EventEmitter<number>();

  //searchBar var
  private searchTerms = new Subject<string>();
  term: string = "";
  //fetchData var
  offset: number = 0;
  limit: number = 20;


  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.fetchPokemons();

    this.searchTerms.pipe(debounceTime(300))
      .pipe(distinctUntilChanged())
      .pipe(
        switchMap((term: string) => this.pokemonService.getPokemonByString(term, this.offset, this.limit))
      )
      .subscribe(this.subscriptionsRoutine);
  }

  onSelect(id: number) {
    this.itemChanged.emit(id);
  }

  onScroll() {
    console.log(`PokemonService : scrolled`);
    this.fetchPokemons();
  }

  private fetchPokemons() {
    if (this.term.length > 0) {
      this.pokemonService.getPokemonByString(this.term, this.offset,this.limit)
        .subscribe(this.subscriptionsRoutine);
    } else {
      this.pokemonService.getPokemonsData(this.offset, this.limit)
        .subscribe(this.subscriptionsRoutine);
    }
  }

  search(term: string) {
    this.pageData = null
    this.offset = 0;
    this.term = term;
    if (term.length > 0) {
      console.log(`PokemonService : seorched`);
      this.searchTerms.next(term);
    } else {
      this.fetchPokemons();
    }
  }

  subscriptionsRoutine = (result: PageData) => {
    this.pageData = result;
    if(result) this.offset += result.data.length;
    console.log(this.offset);
  };

}
