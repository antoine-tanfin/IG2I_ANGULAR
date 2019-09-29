import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonListComponent } from './pokemons/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemons/pokemon-detail/pokemon-detail.component';


const routes: Routes = [
{ path: '', redirectTo: '/Pokelist', pathMatch: 'full' },
{ path: 'details/:id', component: PokemonDetailComponent },
{ path: 'Pokelist', component: PokemonListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
