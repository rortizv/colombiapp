import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NearbyCitiesPage } from './nearby-cities.page';

describe('NearbyCitiesPage', () => {
  let component: NearbyCitiesPage;
  let fixture: ComponentFixture<NearbyCitiesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyCitiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
