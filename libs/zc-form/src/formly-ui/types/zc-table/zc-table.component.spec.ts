import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZcTableComponent } from './zc-table.component';

describe('ZcTableComponent', () => {
  let component: ZcTableComponent;
  let fixture: ComponentFixture<ZcTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ZcTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZcTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
