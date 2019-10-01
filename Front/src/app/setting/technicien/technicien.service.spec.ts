/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TechnicienService } from './technicien.service';

describe('Service: Technicien', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TechnicienService]
    });
  });

  it('should ...', inject([TechnicienService], (service: TechnicienService) => {
    expect(service).toBeTruthy();
  }));
});
