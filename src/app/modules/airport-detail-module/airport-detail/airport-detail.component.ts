import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AirportDetailDTO } from 'src/app/shared/interface/airportDetail.interface';
import { AirportDetailService } from '../airport-detail.service';

@Component({
  selector: 'app-airport-detail',
  templateUrl: './airport-detail.component.html',
  styleUrls: ['./airport-detail.component.css'],
})
export class AirportDetailComponent implements OnInit {
  isLoading = false;
  isStored = false;
  airport!: AirportDetailDTO;
  airportForm!: FormGroup;
  private routeId = this.route.snapshot.paramMap.get('id');

  constructor(
    private route: ActivatedRoute,
    private airportDetailService: AirportDetailService,
  ) { }

  ngOnInit() {
    this.initForm();
    this.isInLocalSorage(this.routeId as string);
    if (this.routeId !== ':id' && !this.isStored)
      this.loadDeatailsFromApi(this.routeId as string)
  }

  private isInLocalSorage(id: string) {
    const storedData = localStorage.getItem(`airport-${id}`);
    if (storedData) {
      this.isStored = true;
      const airport = JSON.parse(storedData);
      this.airportForm.patchValue(airport);
    }
  }

  private loadDeatailsFromApi(id: string) {
    this.airportDetailService.getOne(id).subscribe((response: AirportDetailDTO) => {
      this.airport = response;
      this.setformValue();
    });
  }

  private setformValue() {
    this.airportForm.setValue({
      subType: this.airport.subType,
      name: this.airport.name,
      detailedName: this.airport.detailedName,
      id: this.airport.id,
      cityName: this.airport.address.cityName,
      countryName: this.airport.address.countryName
    });
  }
  private initForm() {
    this.airportForm = this.airportDetailService.createForm();
  }

  saveToLocalStorage() {
    localStorage.setItem(`airport-${this.routeId}`, JSON.stringify(this.airportForm.value));
    alert('Saved in LocalStorage');
  }
}
