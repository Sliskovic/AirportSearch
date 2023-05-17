import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AirportSearchComponent } from './airport-search/airport-search.component';


const routes: Routes = [
    {
      path: '',
      component: AirportSearchComponent
    },
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class AirportRoutingModule {}