import { async, TestBed } from '@angular/core/testing';
import { ZcPageBuilderModule } from './zc-page-builder.module';

describe('ZcPageBuilderModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ZcPageBuilderModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ZcPageBuilderModule).toBeDefined();
  });
});
