import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapDetailPage } from './map-detail.page';

describe('MapDetailPage', () => {
  let component: MapDetailPage;
  let fixture: ComponentFixture<MapDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MapDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
