import { TestBed } from '@angular/core/testing';

import { HopitalService } from './hopital.service';

describe('HopitalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HopitalService = TestBed.get(HopitalService);
    expect(service).toBeTruthy();
  });
});
