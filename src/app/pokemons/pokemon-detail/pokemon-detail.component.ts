import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../services/pokemon.model';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  
  pokemon: Pokemon;
  @Input() id: number;

  // constructor(private route : ActivatedRoute, private pokemonService: PokemonService, private location : Location) { }
  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {}

  ngOnChanges() {
    this.getpokemon();
  }

  getpokemon() {
    this.pokemonService.getPokemonById(this.id).subscribe((result: Pokemon) => {
      this.pokemon = result;
    });
  }

}
