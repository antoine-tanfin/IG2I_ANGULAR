import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../../services/pokemon.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  
  @Input() pokemon: Pokemon;

  constructor(private route : ActivatedRoute, private pokemonService: PokemonService, private location : Location) { }

  ngOnInit() {
    this.getHero();
  }

  getHero(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.pokemonService.getPokemonDetails(id).subscribe(pokemon => this.pokemon = pokemon);
  };

  goBack(){
    this.location.back();
  }

}
