import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CentroayudaPage } from './centroayuda.page';

describe('CentroayudaPage', () => {
  let component: CentroayudaPage;
  let fixture: ComponentFixture<CentroayudaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroayudaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
