import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.page').then(m => m.AboutPage)
  },
  {
    path: 'regions',
    loadComponent: () => import('./pages/regions/regions.page').then(m => m.RegionsPage)
  },
  {
    path: 'departments',
    loadComponent: () => import('./pages/departments/departments.page').then(m => m.DepartmentsPage)
  },
  {
    path: 'cities',
    loadComponent: () => import('./pages/cities/cities.page').then(m => m.CitiesPage)
  },
  {
    path: 'city-detail',
    loadComponent: () => import('./pages/city-detail/city-detail.page').then(m => m.CityDetailPage)
  },
  {
    path: 'presidents',
    loadComponent: () => import('./pages/presidents/presidents.page').then(m => m.PresidentsPage)
  },
  {
    path: 'department-detail',
    loadComponent: () => import('./pages/department-detail/department-detail.page').then(m => m.DepartmentDetailPage)
  },
  {
    path: 'airports',
    loadComponent: () => import('./pages/airports/airports.page').then(m => m.AirportsPage)
  },
  {
    path: 'airport-detail',
    loadComponent: () => import('./pages/airport-detail/airport-detail.page').then(m => m.AirportDetailPage)
  },
  {
    path: 'constitution-articles',
    loadComponent: () => import('./pages/constitution-articles/constitution-articles.page').then(m => m.ConstitutionArticlesPage)
  },
  {
    path: 'radio-stations',
    loadComponent: () => import('./pages/radio-stations/radio-stations.page').then(m => m.RadioStationsPage)
  },
  {
    path: 'radio-detail',
    loadComponent: () => import('./pages/radio-detail/radio-detail.page').then(m => m.RadioDetailPage)
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];
