import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollViewModule } from '@progress/kendo-angular-scrollview';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HairComponent } from './hair/hair.component';
import { FilmsComponent } from './films/films.component';
import { SwapiService } from './services/swapi.service';

// Import the ButtonsModule
import { ButtonsModule } from '@progress/kendo-angular-buttons';

@NgModule({
  declarations: [
    AppComponent,
    HairComponent,
    FilmsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ButtonsModule,
    BrowserAnimationsModule,
    ScrollViewModule
  ],
  providers: [DatePipe, SwapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
