import { async, TestBed } from '@angular/core/testing';
import { ZcChartsModule } from './zc-charts.module';

describe('ZcChartsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ZcChartsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ZcChartsModule).toBeDefined();
  });
});
