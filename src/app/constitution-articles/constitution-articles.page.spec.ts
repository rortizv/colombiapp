import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConstitutionArticlesPage } from './constitution-articles.page';

describe('ConstitutionArticlesPage', () => {
  let component: ConstitutionArticlesPage;
  let fixture: ComponentFixture<ConstitutionArticlesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstitutionArticlesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
