import { Component, Input } from '@angular/core';
import { AirportDTO } from 'src/app/shared/interface/airport.interface';

@Component({
  selector: 'app-airports-list',
  templateUrl: './airports-list.component.html',
  styleUrls: ['./airports-list.component.css'],
})
export class AirportsListComponent {

  @Input() airports!: AirportDTO[];
  @Input() cityName!: string;

}
