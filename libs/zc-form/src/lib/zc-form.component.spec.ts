import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZcFormComponent } from './zc-form.component';

describe('ZcFormComponent', () => {
  let component: ZcFormComponent;
  let fixture: ComponentFixture<ZcFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ZcFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
