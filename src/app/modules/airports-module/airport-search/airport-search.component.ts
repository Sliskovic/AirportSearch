import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, switchMap, timeout } from 'rxjs';
import { AirportSearchService } from 'src/app/shared/airport-search.service';
import { AirportDTO } from 'src/app/shared/interface/airport.interface';

@Component({
  selector: 'app-airport-search',
  templateUrl: './airport-search.component.html',
  styleUrls: ['./airport-search.component.css'],
})
export class AirportSearchComponent implements OnInit {
  isLoading = false;
  noResultsFound = false;
  
  searchForm!: FormGroup;
  cityName!: FormControl;
  airports: AirportDTO[] = [];

  constructor( private airportService: AirportSearchService ) { }

  ngOnInit() {
    this.cityName = new FormControl('', [Validators.required]);
    this.searchForm = new FormGroup({
      cityName: this.cityName,
    });
  }

  loadData(): void {
    const city: string = this.searchForm.value.cityName;
    this.isCityValid(city);
    this.airportService
      .getAll(city)
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        timeout(5000),
        switchMap((airports: AirportDTO[]) => {
          this.isLoading = false;
          return of(airports);
        })
      )
      .subscribe((airports: AirportDTO[]) => {
        this.airports = airports;
        this.noResultsFound = !Array.isArray(airports) || !airports.length;
      });
  }

  isCityValid(cityName: string) {
    if (!cityName) {
      this.isLoading = false;
      this.airports = [];
      return;
    }
  }
}
