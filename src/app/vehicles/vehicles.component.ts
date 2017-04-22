import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { DatePipe } from '@angular/common';

import {SwapiService} from '../services/swapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
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
export class VehiclesComponent {
  flip: string = 'inactive';
  vehicles: Array<any> = [];
  vehicle: { };
  vehicle_count: Number = 0;
  answer: string = '';
  answers: Array<any> = [];
  current_id: Number;
  question = '';
  films: Array<any> = [];
  correct_films: Array<any> = [];

  constructor(private datePipe: DatePipe,
              private swapi: SwapiService) {
    this.swapi.getVehicles().subscribe(
        vehicles => {
          this.vehicles = vehicles;
          this.vehicle_count = vehicles.count;
          this.getVehicle(this.vehicle_count);
        },
        error =>  {
          console.log(error);
        }
    );

  }

  getFilms(ids) {
    for (let id of ids) {
      this.swapi.getFilm(id).subscribe(
          (film) => {
            this.answers.push(film.title);
          },
          (error) =>  {
            console.log('sorry, getting the film didn\'t work');
          },
          () => {
            this.answer = this.answers.join(', ');
          }
      );
    }
  }

  getVehicle(count) {
    let id = this.getRandomId(count);
    this.swapi.getVehicle(id).subscribe(
        vehicle => {
          this.vehicle = vehicle;
          this.getQuestionAndAnswer(vehicle, count);
        },
        error =>  {
          this.getVehicle(count);
        }
    )
  }

  getNew() {
    this.getVehicle(this.vehicle_count);
    this.flip = 'inactive';
  }

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

  getQuestionAndAnswer(vehicle, count) {
    var types = [
      {
        value: 'films',
        question: 'Which film(s) did the '
      },
      {
        value: 'crew',
        question: 'How many crew does a '
      }
    ];

    var type = types[Math.floor(Math.random() * types.length)];

    if (type.value === 'films') {
      this.question = type.question + ' ' + vehicle.name + ' appear in?';

      var correct_films = vehicle[type.value];
      var film_ids = [];
      var split_url;

      for (let film of correct_films) {
        split_url = film.split('/');
        film_ids.push(split_url[split_url.length - 2]);
      }

      this.getFilms(film_ids);
    }

    if (type.value === 'crew') {
      this.question = type.question + vehicle.name + ' support?';
      this.answer = vehicle.crew;
    }
  }

  transformDate(date) {
    return this.datePipe.transform(date, 'MM/dd/yyyy');
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
