import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AirportsPage } from './airports.page';

describe('AirportsPage', () => {
  let component: AirportsPage;
  let fixture: ComponentFixture<AirportsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AirportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
