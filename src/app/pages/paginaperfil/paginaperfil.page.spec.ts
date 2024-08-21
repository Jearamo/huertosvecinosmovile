import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaperfilPage } from './paginaperfil.page';

describe('PaginaperfilPage', () => {
  let component: PaginaperfilPage;
  let fixture: ComponentFixture<PaginaperfilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaperfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
