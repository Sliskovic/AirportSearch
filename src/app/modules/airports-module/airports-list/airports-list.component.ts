import { Component, Input } from '@angular/core';

import { AirportDTO } from 'src/app/shared/interface/airport.interface';
import { AirportSearchHistoryService } from 'src/app/modules/airports-module/airport-search-history.service';

@Component({
  selector: 'app-airports-list',
  templateUrl: './airports-list.component.html',
  styleUrls: ['./airports-list.component.css'],
})
export class AirportsListComponent {

  @Input() airports!: AirportDTO[];
  @Input() cityName!: string;
  @Input() topAirports!: AirportDTO[];

  constructor(private airportHistoryService: AirportSearchHistoryService){}

  isInTopAirports(airport: AirportDTO): boolean {
    const history = this.airportHistoryService.getHistory();
    if (history.length < 11) {
      return false;
    }
    return this.topAirports.some(topAirport => topAirport.id === airport.id);
  }
}
