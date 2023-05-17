import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, switchMap, timeout } from 'rxjs';

import { AirportSearchHistoryService } from 'src/app/modules/airports-module/airport-search-history.service';
import { AirportSearchService } from 'src/app/modules/airports-module/airport-search.service';
import { AirportDTO } from 'src/app/shared/interface/airport.interface';

@Component({
  selector: 'app-airport-search',
  templateUrl: './airport-search.component.html',
  styleUrls: ['./airport-search.component.css'],
})
export class AirportSearchComponent implements OnInit {
  noResultsFound = false;
  searchForm!: FormGroup;
  cityName!: FormControl;
  airports: AirportDTO[] = [];
  topAirports: AirportDTO[] = [];

  constructor(private airportService: AirportSearchService, private airportSearchHistoryService: AirportSearchHistoryService) { }

  ngOnInit() {
    this.cityName = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.searchForm = new FormGroup({
      cityName: this.cityName,
    });
  }

  getTopAirports(): void {
    this.topAirports = this.airportSearchHistoryService.getTopAirports();
  }

  loadData(): void {
    const city: string = this.searchForm.value.cityName;
    
    if (!city || city.length < 3) {
      this.airports = [];
      return;
    }
    this.airportService
      .getAll(city)
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        timeout(5000),
        switchMap((airports: AirportDTO[]) => {
          return of(airports);
        })
      )
      .subscribe((airports: AirportDTO[]) => {
        this.airports = airports;
        this.noResultsFound = !Array.isArray(airports) || !airports.length;
        this.getTopAirports();
      });
  }

}
