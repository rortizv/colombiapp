import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioStationsPage } from './radio-stations.page';

describe('RadioStationsPage', () => {
  let component: RadioStationsPage;
  let fixture: ComponentFixture<RadioStationsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioStationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
