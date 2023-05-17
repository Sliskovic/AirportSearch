import { Component, Input } from '@angular/core';
import { AirportDTO } from 'src/app/shared/interface/airport.interface';

@Component({
  selector: 'app-airports-top10',
  templateUrl: './airports-top10.component.html',
  styleUrls: ['./airports-top10.component.css']
})
export class AirportsTop10Component {
  @Input() topAirports!: AirportDTO[];
  
}
