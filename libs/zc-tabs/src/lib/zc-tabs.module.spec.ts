import { async, TestBed } from '@angular/core/testing';
import { ZcTabsModule } from './zc-tabs.module';

describe('ZcTabsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ZcTabsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ZcTabsModule).toBeDefined();
  });
});
