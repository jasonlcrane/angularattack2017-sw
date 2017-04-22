import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HairComponent} from "./hair/hair.component";
import {FilmsComponent} from "./films/films.component";
import {LanguagesComponent} from "./languages/languages.component";
import {VehiclesComponent} from "./vehicles/vehicles.component";
import {CreditsComponent} from "./common/credits.component";

const routes: Routes = [
    { path: '', component: FilmsComponent },
    { path: 'hair', component: HairComponent},
    { path: 'films', component: FilmsComponent},
    { path: 'languages', component: LanguagesComponent},
    { path: 'vehicles', component: VehiclesComponent},
    { path: 'credits', component: CreditsComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}