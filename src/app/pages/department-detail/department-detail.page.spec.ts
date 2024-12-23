import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepartmentDetailPage } from './department-detail.page';

describe('DepartmentDetailPage', () => {
  let component: DepartmentDetailPage;
  let fixture: ComponentFixture<DepartmentDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
