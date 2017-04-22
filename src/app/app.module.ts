import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollViewModule } from '@progress/kendo-angular-scrollview';

import { AppComponent } from './app.component';
import { SwapiService } from './services/swapi.service';

// Import the ButtonsModule
import { ButtonsModule } from '@progress/kendo-angular-buttons';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    ButtonsModule,
    BrowserAnimationsModule,
    ScrollViewModule
  ],
  providers: [SwapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
