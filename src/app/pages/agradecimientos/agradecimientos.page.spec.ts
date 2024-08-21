import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgradecimientosPage } from './agradecimientos.page';

describe('AgradecimientosPage', () => {
  let component: AgradecimientosPage;
  let fixture: ComponentFixture<AgradecimientosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgradecimientosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
