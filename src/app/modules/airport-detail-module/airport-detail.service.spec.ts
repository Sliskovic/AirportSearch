import { TestBed } from '@angular/core/testing';

import { AirportDetailService } from './airport-detail.service';

describe('AirportDetailService', () => {
  let service: AirportDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirportDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
