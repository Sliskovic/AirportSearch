import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, map, switchMap, of } from 'rxjs';

import { environment } from 'src/environment/environment';
import { AirportSearchHistoryService } from './airport-search-history.service';
import { AirportDTO } from 'src/app/shared/interface/airport.interface';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AirportSearchService {
  
  constructor(
    private auth: AuthService,
    private airportSearchHistoryService: AirportSearchHistoryService
  ) { }

  getAll(cityName: string): Observable<AirportDTO[]> {
    const airportsUrl = `${environment.apiUrl}/reference-data/locations`;
    const params = this.getAirportsParams(cityName);

    return this.auth.sentToken(airportsUrl, params).pipe(
      map((response: any) => response.data),
      switchMap((airports: AirportDTO[]) => {
        airports?.forEach((airport) => {
          this.airportSearchHistoryService.updateSearchHistory(airport);
        });
        this.airportSearchHistoryService.updateTopAirports();
        return of(airports);
      })
    );
  }

  private getAirportsParams(cityName: string): HttpParams {
    return new HttpParams()
      .set('subType', 'AIRPORT')
      .set('keyword', cityName)
      .set('page[limit]', '5')
      .set('page[offset]', '0')
      .set('view', 'LIGHT');
  }
}
