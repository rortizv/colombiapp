import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PresidentsPage } from './presidents.page';

describe('PresidentsPage', () => {
  let component: PresidentsPage;
  let fixture: ComponentFixture<PresidentsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PresidentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
