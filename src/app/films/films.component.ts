import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { DatePipe } from '@angular/common';

import {SwapiService} from '../services/swapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss'],
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
export class FilmsComponent {
  flip: string = 'inactive';
  films: Array<any> = [];
  film: { };
  film_count: Number = 0;
  answer: string = '';
  current_id: Number;
  question = '';

  constructor(private datePipe: DatePipe,
              private swapi: SwapiService) {
    this.swapi.getFilms().subscribe(
        films => {
          this.films = films;
          this.film_count = films.count;
          this.getFilm(this.film_count);
        },
        error =>  {
          console.log(error);
        }
    );

  }

  getFilm(count) {
    let id = this.getRandomId(count);
    this.swapi.getFilm(id).subscribe(
        film => {
          this.film = film;
          this.getQuestionAndAnswer(film, count);
        },
        error =>  {
          this.getFilm(count);
        }
    )
  }

  getNewFilm() {
    this.getFilm(this.film_count);
    this.flip = 'inactive';
  }

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

  getQuestionAndAnswer(film, count) {
    var types = [
      {
        value: 'director',
        question: 'Who directed '
      },
      {
        value: 'producer',
        question: 'Who produced '
      },
      {
        value: 'release_date',
        question: 'What was the release date of '
      },
      {
        value: 'opening_crawl',
        question: 'What was the opening crawl of '
      }
    ];

    var type = types[Math.floor(Math.random() * types.length)];
    this.question = type.question + ' ' + film.title + '?';
    this.answer = film[type.value];
    if (type.value === 'release_date') {
      this.answer = this.transformDate(this.answer);
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
