import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AirportSearchService } from './airport-search.service';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  providers: [AirportSearchService],
})
export class SharedModule { }
