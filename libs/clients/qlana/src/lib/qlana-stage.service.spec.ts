import { TestBed } from '@angular/core/testing';

import { QlanaStageService } from './qlana-stage.service';

describe('QlanaStageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QlanaStageService = TestBed.get(QlanaStageService);
    expect(service).toBeTruthy();
  });
});
