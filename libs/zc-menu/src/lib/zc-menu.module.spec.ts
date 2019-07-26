import { async, TestBed } from '@angular/core/testing';
import { ZcMenuModule } from './zc-menu.module';

describe('ZcMenuModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ZcMenuModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ZcMenuModule).toBeDefined();
  });
});
