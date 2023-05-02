import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, switchMap, map, first, of, catchError } from 'rxjs';
import { environment } from 'src/environment/environment';
import { TokenDTO } from './interface/token.interface';
import { AirportDTO } from './interface/airport.interface';
import { AirportDetailDTO } from './interface/airportDetail.interface';

@Injectable({
  providedIn: 'root'
})
export class AirportSearchService {

  constructor(private http: HttpClient) {}

  getAll(cityName: string): Observable<AirportDTO[]> {
    const airportsUrl = `${environment.apiUrl}/reference-data/locations?subType=AIRPORT&keyword=${cityName}&page%5Blimit%5D=5&page%5Boffset%5D=0&view=LIGHT`;
    return this.sentToken(airportsUrl)
    .pipe(map((data:any)=>data.data))
  }

  getOne(id: string): Observable<AirportDetailDTO[]> {
    const airportDetailUrl = `${environment.apiUrl}/reference-data/locations/${id}`;
    return this.sentToken(airportDetailUrl);
  }

  // TODO: authorization
  private readonly apiUrl: string = environment.apiUrl;
  private readonly clientId: string = environment.API_KEY;
  private readonly clientSecret: string = environment.API_SECRET;

  private sentToken<T>(url: string): Observable<T[]>{
    return from(this.getAccessToken()).pipe(
      switchMap(
      token=> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<T[]>(url, {headers});
      }),
      catchError(this.handleError<T[]>('data', []))
    );
  }
  private getAccessToken(): Observable<string> {
    const body = `grant_type=client_credentials&client_id=${this.clientId}&client_secret=${this.clientSecret}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post<TokenDTO>(`${this.apiUrl}/security/oauth2/token`, body, { headers }).pipe(
      map((response: TokenDTO) => response.access_token),
      first()
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}