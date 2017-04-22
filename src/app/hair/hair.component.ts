import { Component, trigger, state, style, transition, animate } from '@angular/core';
import {SwapiService} from '../services/swapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './hair.component.html',
  // styleUrls: ['./hair.component.scss'],
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

export class HairComponent {
  flip: string = 'inactive';
  people: Array<any> = [];
  person: { };
  people_count: Number = 0;
  answer: string = '';
  current_id: Number;
  name: string = '';
  excludeIds: Array<any> = [];

  constructor(private swapi: SwapiService) {
    this.swapi.getPeople().subscribe(
        people => {
          this.people = people;
          this.people_count = people.count;
          this.getPerson(this.people_count);
        },
        error =>  {
          console.log(error);
        }
    );

  }

  getPerson(count) {
    let id = this.getRandomId(count);
    this.swapi.getPerson(id).subscribe(
        person => {
          if ( person.hair_color === 'none' || person.hair_color === 'n/a' ) {
            this.excludeIds.push(id);
            this.getPerson(count);
          }
          else {
            this.person = person;
            this.getPossessiveName(person.name);
            this.getAnswer(person);
          }
        },
        error =>  {
          this.getPerson(count);
        }
    )
  }

  getNewPerson() {
    this.getPerson(this.people_count);
    this.flip = 'inactive';
  }

  getPossessiveName(name) {
    if ( name.endsWith('s') ) {
      // add apostrophe after the s in their name
      this.name = name + "'";
    }
    else {
      this.name = name + "'s";
    }
  }

  getAnswer(person) {
      this.answer = this.name + " hair is " + person.hair_color;
  }

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

  public getRandomId(count) {
    var id = Math.floor(Math.random()*count);
    if ( id !== this.current_id && this.excludeIds.indexOf(id) === -1 && id !== undefined) {
      return id;
    }
    else {
      this.getRandomId(count);
    }
  }

}
