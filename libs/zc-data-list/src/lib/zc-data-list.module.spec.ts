import { async, TestBed } from '@angular/core/testing';
import { ZcDataListModule } from './zc-data-list.module';

describe('ZcDataListModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ZcDataListModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ZcDataListModule).toBeDefined();
  });
});
