import { async, TestBed } from '@angular/core/testing';
import { ZcFormModule } from './zc-form.module';

describe('ZcFormModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ZcFormModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ZcFormModule).toBeDefined();
  });
});
