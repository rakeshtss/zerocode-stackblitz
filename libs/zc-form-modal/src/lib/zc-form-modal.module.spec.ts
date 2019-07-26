import { async, TestBed } from '@angular/core/testing';
import { ZcFormModalModule } from './zc-form-modal.module';

describe('ZcFormModalModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ZcFormModalModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ZcFormModalModule).toBeDefined();
  });
});
