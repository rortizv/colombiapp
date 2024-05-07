import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitiesPage } from './cities.page';

describe('CitiesPage', () => {
  let component: CitiesPage;
  let fixture: ComponentFixture<CitiesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
