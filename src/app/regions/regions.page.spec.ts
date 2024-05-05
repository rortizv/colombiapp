import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegionsPage } from './regions.page';

describe('RegionsPage', () => {
  let component: RegionsPage;
  let fixture: ComponentFixture<RegionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
