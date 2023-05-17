import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, switchMap, catchError, map, of } from 'rxjs';

import { environment } from 'src/environment/environment';
import { TokenDTO } from '../interface/token.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl: string = environment.apiUrl;
  private readonly clientId: string = environment.API_KEY;
  private readonly clientSecret: string = environment.API_SECRET;

  constructor(private http: HttpClient) { }

  sentToken<T>(url: string, params?: HttpParams): Observable<T[]> {
    return from(this.getAccessToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders().set(
          'Authorization',
          `Bearer ${token}`
        );
        return this.http.get<T[]>(url, { headers, params });
      }),
      catchError(this.handleError<T[]>('Load Data', []))
    );
  }
  private getAccessToken(): Observable<string> {
    const body = `grant_type=client_credentials&client_id=${this.clientId}&client_secret=${this.clientSecret}`;
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    return this.http
      .post<TokenDTO>(`${this.apiUrl}/security/oauth2/token`, body, { headers })
      .pipe(
        map((response: TokenDTO) => response.access_token),
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: Error): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
