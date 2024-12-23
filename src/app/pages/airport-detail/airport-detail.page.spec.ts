import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AirportdetailPage } from './airport-detail.page';

describe('AirportdetailPage', () => {
  let component: AirportdetailPage;
  let fixture: ComponentFixture<AirportdetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AirportdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
