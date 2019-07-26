import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZcDataListFilterComponent } from './zc-data-list-filter.component';

describe('ZcDataListFilterComponent', () => {
  let component: ZcDataListFilterComponent;
  let fixture: ComponentFixture<ZcDataListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ZcDataListFilterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZcDataListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
