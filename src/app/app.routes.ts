import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.page').then( m => m.AboutPage)
  },
  {
    path: 'regions',
    loadComponent: () => import('./regions/regions.page').then( m => m.RegionsPage)
  },
  {
    path: 'departments',
    loadComponent: () => import('./departments/departments.page').then( m => m.DepartmentsPage)
  },
  {
    path: 'cities',
    loadComponent: () => import('./cities/cities.page').then( m => m.CitiesPage)
  },
  {
    path: 'city-detail',
    loadComponent: () => import('./city-detail/city-detail.page').then( m => m.CityDetailPage)
  },
  {
    path: 'presidents',
    loadComponent: () => import('./presidents/presidents.page').then( m => m.PresidentsPage)
  },
  {
    path: 'department-detail',
    loadComponent: () => import('./department-detail/department-detail.page').then( m => m.DepartmentDetailPage)
  },
  {
    path: 'airports',
    loadComponent: () => import('./airports/airports.page').then( m => m.AirportsPage)
  },
  {
    path: 'airport-detail',
    loadComponent: () => import('./airport-detail/airport-detail.page').then( m => m.AirportDetailPage)
  },
  {
    path: 'constitution-articles',
    loadComponent: () => import('./constitution-articles/constitution-articles.page').then( m => m.ConstitutionArticlesPage)
  },
  {
    path: 'radio-stations',
    loadComponent: () => import('./radio-stations/radio-stations.page').then( m => m.RadioStationsPage)
  },
  {
    path: 'radio-detail',
    loadComponent: () => import('./radio-detail/radio-detail.page').then( m => m.RadioDetailPage)
  },
  {
    path: '**',
    redirectTo: 'home',
  },
  {
    path: 'maps',
    loadComponent: () => import('./maps/maps.page').then( m => m.MapsPage)
  },
  {
    path: 'map-detail',
    loadComponent: () => import('./map-detail/map-detail.page').then( m => m.MapDetailPage)
  }
];
