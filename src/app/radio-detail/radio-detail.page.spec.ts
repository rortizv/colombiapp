import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioDetailPage } from './radio-detail.page';

describe('RadioDetailPage', () => {
  let component: RadioDetailPage;
  let fixture: ComponentFixture<RadioDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
