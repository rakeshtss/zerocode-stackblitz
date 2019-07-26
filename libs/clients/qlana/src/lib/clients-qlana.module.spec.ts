import { async, TestBed } from '@angular/core/testing';
import { ClientsQlanaModule } from './clients-qlana.module';

describe('ClientsQlanaModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientsQlanaModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ClientsQlanaModule).toBeDefined();
  });
});
