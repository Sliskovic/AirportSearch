import { TestBed } from '@angular/core/testing';
import { AirportSearchHistoryService } from './airport-search-history.service';


describe('AirportSearchHistoryService', () => {
  let service: AirportSearchHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirportSearchHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
