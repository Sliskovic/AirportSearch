import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';

import { AirportDetailDTO } from 'src/app/shared/interface/airportDetail.interface';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AirportDetailService {

  constructor(private auth: AuthService, private formBuilder: FormBuilder) { }

  getOne(id: string): Observable<AirportDetailDTO> {
    const airportDetailUrl = `${environment.apiUrl}/reference-data/locations/${id}`;
    return this.auth.sentToken(airportDetailUrl)
      .pipe(
        map((response: any) => response.data)
      )
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      subType: ['', Validators.required],
      name: ['', Validators.required],
      detailedName: ['', Validators.required],
      id: ['', Validators.required],
      cityName: ['', Validators.required],
      countryName: ['', Validators.required]
    });
  }

}
