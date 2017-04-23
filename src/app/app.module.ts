import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HairComponent } from './hair/hair.component';
import { FilmsComponent } from './films/films.component';
import { LanguagesComponent } from './languages/languages.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { CreditsComponent } from './common/credits.component';
import { SwapiService } from './services/swapi.service';

// Import the ButtonsModule
import { ButtonsModule } from '@progress/kendo-angular-buttons';

@NgModule({
  declarations: [
    AppComponent,
    HairComponent,
    FilmsComponent,
    LanguagesComponent,
    VehiclesComponent,
    CreditsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ButtonsModule,
    DropDownsModule,
    BrowserAnimationsModule
  ],
  providers: [
    DatePipe,
    SwapiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
