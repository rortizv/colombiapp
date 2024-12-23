import { TestBed } from '@angular/core/testing';

import { ApicolombiaService } from './apicolombia.service';

describe('ApicolombiaService', () => {
  let service: ApicolombiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApicolombiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
