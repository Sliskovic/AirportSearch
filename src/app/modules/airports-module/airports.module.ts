import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AirportsListComponent } from './airports-list/airports-list.component';
import { AirportSearchComponent } from './airport-search/airport-search.component';
import { AirportRoutingModule } from './airport-routing.module';
import { AirportsTop10Component } from './airports-top10/airports-top10.component';
import { AirportSearchService } from './airport-search.service';
import { AirportSearchHistoryService } from 'src/app/modules/airports-module/airport-search-history.service';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    AirportsListComponent,
    AirportSearchComponent,
    AirportsTop10Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AirportRoutingModule,
    SharedModule
  ],
  providers:[AirportSearchService, AirportSearchHistoryService],
  exports: [AirportsListComponent]

})
export class AirportsModule { }
