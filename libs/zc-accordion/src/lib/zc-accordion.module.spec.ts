import { async, TestBed } from '@angular/core/testing';
import { ZcAccordionModule } from './zc-accordion.module';

describe('ZcAccordionModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ZcAccordionModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ZcAccordionModule).toBeDefined();
  });
});
