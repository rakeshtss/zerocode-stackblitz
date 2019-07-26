import { TestBed } from '@angular/core/testing';

import { ZcFormService } from './zc-form.service';

describe('ZcFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZcFormService = TestBed.get(ZcFormService);
    expect(service).toBeTruthy();
  });
});
