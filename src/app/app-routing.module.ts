import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HairComponent} from "./hair/hair.component";
import {FilmsComponent} from "./films/films.component";

const routes: Routes = [
    { path: '', component: HairComponent },
    { path: 'hair', component: HairComponent},
    { path: 'films', component: FilmsComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}