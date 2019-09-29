import { Component, OnInit } from '@angular/core';
import { PageData,PokemonShort } from '../../services/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pageData: PageData;

  constructor(private pokemonService: PokemonService) {
    this.pokemonService.getPokemonsData(0,20).subscribe(pageData => this.pageData = pageData);
  }

  ngOnInit() {
  }

  

  onScroll() {
    this.pokemonService.getPokemonsData(this.pageData.offset+20,20).subscribe(pageData => {
      this.pageData.data = this.pageData.data.concat(pageData.data);
      this.pageData.offset = this.pageData.offset+20;
    });
  }


}
