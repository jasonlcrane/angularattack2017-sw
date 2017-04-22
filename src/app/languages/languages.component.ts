import { Component, trigger, state, style, transition, animate } from '@angular/core';

import {SwapiService} from '../services/swapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179.9deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class LanguagesComponent {
  flip: string = 'inactive';
  species: Array<any> = [];
  one_species: { };
  species_count: Number = 0;
  answer: string = '';
  current_id: Number;
  question = '';

  constructor(private swapi: SwapiService) {
    this.swapi.getSpecies().subscribe(
        species => {
          this.species = species;
          this.species_count = species.count;
          this.getOneSpecies(this.species_count);
        },
        error =>  {
          console.log(error);
        }
    );

  }

  getOneSpecies(count) {
    let id = this.getRandomId(count);
    console.log(id);
    this.swapi.getSpecie(id).subscribe(
        species => {
          this.one_species = species;
          this.getQuestionAndAnswer(species, count);
        },
        error =>  {
          this.getOneSpecies(count);
        }
    )
  }

  getNew() {
    this.getOneSpecies(this.species_count);
    this.flip = 'inactive';
  }

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

  getQuestionAndAnswer(species, count) {
    var types = [
      {
        value: 'language',
        question: 'What language do '
      }
    ];

    var type = types[Math.floor(Math.random() * types.length)];
    this.question = type.question + ' ' + species.name + ' speak?';
    this.answer = species[type.value];

  }

  // TODO:  this needs to be better
  public getRandomId(count) {
    var id = Math.floor(Math.random() * count) + 1;
    if ( id !== this.current_id && id !== undefined) {
      this.current_id = id;
      return id;
    }
    else {
      this.getRandomId(count);
      return 1;
    }
  }

}
