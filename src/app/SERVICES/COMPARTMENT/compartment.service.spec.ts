import { TestBed } from '@angular/core/testing';

import { CompartmentService } from './compartment.service';

describe('CompartmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompartmentService = TestBed.get(CompartmentService);
    expect(service).toBeTruthy();
  });
});
