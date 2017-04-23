import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  data: Array<{ text: string, value: string }> = [];
  selectedItem: string = 'films';

  public source: Array<{ text: string, value: string }> = [
    {
      text: 'Film facts',
      value: 'films'
    },
    {
      text: 'Languages',
      value: 'languages'
    },
    {
      text: 'Vehicles',
      value: 'vehicles'
    },
    {
      text: 'Hair color (why not?)',
      value: 'hair'
    }
  ];

  private toggleText: string = "Show";
  private show: boolean = false;
  showCreditLink: boolean = true;

  constructor(private _router: Router) {

    this.data = this.source.slice();

    this._router.events.subscribe( (event) => {
      if (event instanceof NavigationEnd) {
        this.selectedItem = this._router.url.replace('/','');
      }

    })

  }

  ngOnInit() {
    this._router.events.subscribe( (event) => {
      if (event instanceof NavigationEnd) {
        if ( this._router.url === '/credits' ) {
          this.showCreditLink = false;
        }
      }
    });

  }

  public selectionChange(item: any): void {
    this._router.navigate([item]);
  }

}
