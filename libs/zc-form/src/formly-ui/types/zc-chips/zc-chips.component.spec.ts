import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZcChipsComponent } from './zc-chips.component';

describe('ZcChipsComponent', () => {
  let component: ZcChipsComponent;
  let fixture: ComponentFixture<ZcChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ZcChipsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZcChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
