import { async, TestBed } from '@angular/core/testing';
import { ZcStepFormModule } from './zc-step-form.module';

describe('ZcStepFormModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ZcStepFormModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ZcStepFormModule).toBeDefined();
  });
});
