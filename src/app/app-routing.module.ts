import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokedexComponent } from './pokemons/pokedex/pokedex.component';


const routes: Routes = [
{ path: '', redirectTo: '/Pokedex', pathMatch: 'full' },
{ path: 'Pokedex', component: PokedexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
