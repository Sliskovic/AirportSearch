import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AirportDetailComponent } from './airport-detail/airport-detail.component';
import { AirportDetailRoutingModule } from './airport-detail-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    AirportDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AirportDetailRoutingModule,
    SharedModule
  ]
})
export class AirportDetailModule { }
