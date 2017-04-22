import {Component} from '@angular/core';

@Component({
    selector: 'credits',
    templateUrl: './credits.component.html',
    styleUrls: ['./credits.component.scss']
})

export class CreditsComponent {
    width: string = "100%";
    height: string = "600px";
    arrows: boolean = true;

    items: Array<any> = [
        {
            'title': 'swapi.co, the Star Wars API',
            'img': 'assets/images/swapi.png',
            'url': 'https://swapi.co/'
        },
        {
            'title': 'Kendo UI',
            'img': 'assets/images/kendo.png',
            'url': 'http://www.telerik.com/kendo-angular-ui/'
        },
        {
            'title': 'Angular Attack',
            'img': 'assets/images/angular-attack.png',
            'url': 'http://www.angularattack.com/'
        }
    ];

    constructor() {}

}
