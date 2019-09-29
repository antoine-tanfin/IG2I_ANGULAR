import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common'
import { Hero } from '../models/hero.model';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../services/hero.service';



@Component({
  selector: 'sw-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(private route : ActivatedRoute, private heroService: HeroService, private location : Location) { }

  ngOnInit() {
    this.getHero();
  }

  getHero(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  };

  goBack(){
    this.location.back();
  }

  save(){
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }

}
