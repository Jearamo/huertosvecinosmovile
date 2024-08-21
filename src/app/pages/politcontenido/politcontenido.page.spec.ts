import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PolitcontenidoPage } from './politcontenido.page';

describe('PolitcontenidoPage', () => {
  let component: PolitcontenidoPage;
  let fixture: ComponentFixture<PolitcontenidoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PolitcontenidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
