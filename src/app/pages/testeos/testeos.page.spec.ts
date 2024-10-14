import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TesteosPage } from './testeos.page';

describe('TesteosPage', () => {
  let component: TesteosPage;
  let fixture: ComponentFixture<TesteosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
