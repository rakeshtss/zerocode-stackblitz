import { async, TestBed } from '@angular/core/testing';
import { ZcManageAppModule } from './zc-manage-app.module';

describe('ZcManageAppModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ZcManageAppModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ZcManageAppModule).toBeDefined();
  });
});
