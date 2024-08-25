import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiopasswordPage } from './cambiopassword.page';

describe('CambiopasswordPage', () => {
  let component: CambiopasswordPage;
  let fixture: ComponentFixture<CambiopasswordPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiopasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
