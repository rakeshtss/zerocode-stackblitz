import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZcButtonComponent } from './zc-button.component';

describe('ZcButtonComponent', () => {
  let component: ZcButtonComponent;
  let fixture: ComponentFixture<ZcButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ZcButtonComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZcButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
