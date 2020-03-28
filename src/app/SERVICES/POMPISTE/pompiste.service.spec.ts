import { TestBed } from '@angular/core/testing';

import { PompisteService } from './pompiste.service';

describe('PompisteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PompisteService = TestBed.get(PompisteService);
    expect(service).toBeTruthy();
  });
});
