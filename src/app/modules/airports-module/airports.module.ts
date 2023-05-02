import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AirportsListComponent } from './airports-list/airports-list.component';
import { AirportSearchComponent } from './airport-search/airport-search.component';
import { AirportRoutingModule } from './airport-routing.module';



@NgModule({
  declarations: [
    AirportsListComponent,
    AirportSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AirportRoutingModule
  ],
  exports: [AirportsListComponent]

})
export class AirportsModule { }
