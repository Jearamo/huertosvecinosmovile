import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginacrearPage } from './paginacrear.page';

describe('PaginacrearPage', () => {
  let component: PaginacrearPage;
  let fixture: ComponentFixture<PaginacrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginacrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
