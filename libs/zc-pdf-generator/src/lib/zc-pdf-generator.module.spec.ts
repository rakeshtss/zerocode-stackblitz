import { async, TestBed } from '@angular/core/testing';
import { ZcPdfGeneratorModule } from './zc-pdf-generator.module';

describe('ZcPdfGeneratorModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ZcPdfGeneratorModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ZcPdfGeneratorModule).toBeDefined();
  });
});
