import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportsTop10Component } from './airports-top10.component';

describe('AirportsTop10Component', () => {
  let component: AirportsTop10Component;
  let fixture: ComponentFixture<AirportsTop10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirportsTop10Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirportsTop10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
