import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AirportSearchHistoryDTO } from 'src/app/shared/interface/airportSearchHistory.interface';
import { AirportDTO } from 'src/app/shared/interface/airport.interface';

@Injectable({
  providedIn: 'root'
})
export class AirportSearchHistoryService {

  private historyKey = 'history';
  private historyLength = 100;
  private topAirportsLength = 10;
  private airportHistory: AirportSearchHistoryDTO[] = [];
  private topAirports: AirportDTO[] = [];
  public historySubject = new BehaviorSubject<AirportSearchHistoryDTO[]>([]);

  constructor() { }

  updateSearchHistory(airport: AirportDTO): void {
    const currentAirport = this.airportHistory.find(item => item.airport.id === airport.id);
    if (currentAirport) {
      currentAirport.count++;
    } else {
      this.addToHistory(airport);
    }
    localStorage.setItem(this.historyKey, JSON.stringify(this.airportHistory));
    this.historySubject.next(this.airportHistory);
  }

  updateTopAirports(): void {
    this.topAirports = this.airportHistory
        .sort((a, b) => b.count - a.count)
        .slice(0, this.topAirportsLength)
        .map(item => item.airport);
  }

  getTopAirports(): AirportDTO[] {
    return this.topAirports;
  }
  getHistory(): AirportSearchHistoryDTO[] {
    return this.airportHistory;
  }

  private addToHistory(airport: AirportDTO): void {
    this.removeLowestRanked();
    this.airportHistory.push({ airport, count: 1 });
  }

  private removeLowestRanked(): void {
    if (this.airportHistory.length == this.historyLength) {
      let lowestRank = 0;
      for (let i = 1; i < this.airportHistory.length; i++) {
        if (this.airportHistory[i].count < this.airportHistory[lowestRank].count) {
          lowestRank = i;
        }
      }
      this.airportHistory.splice(lowestRank, 1);
    }
  }
}
