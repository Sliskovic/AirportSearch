import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AirportSearchService } from 'src/app/shared/airport-search.service';
import { AirportDetailDTO } from 'src/app/shared/interface/airportDetail.interface';

@Component({
  selector: 'app-airport-detail',
  templateUrl: './airport-detail.component.html',
  styleUrls: ['./airport-detail.component.css'],
})
export class AirportDetailComponent implements OnInit {
  isLoading: boolean = false;
  isStored: boolean = false;
  airport!: AirportDetailDTO;
  airportForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private airportService: AirportSearchService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.initForm();
    this.isInLocalSorage(id as string);
    if(id !==':id' && !this.isStored)
    this.loadDeatailsFromApi(id as string)
    
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
    this.airportService.getOne(id as string).subscribe((response: any) => {
      this.airport = response.data;
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
    this.airportForm = this.formBuilder.group({
      subType: ['', Validators.required],
      name: ['', Validators.required],
      detailedName: ['', Validators.required],
      id: ['', Validators.required],
      cityName: ['', Validators.required],
      countryName: ['', Validators.required]
    });
  }

    saveToLocalStorage() {
    const id = this.route.snapshot.paramMap.get('id');
    localStorage.setItem(`airport-${id}`, JSON.stringify(this.airportForm.value))
    alert('Saved in LocalStorage');
  }
}
