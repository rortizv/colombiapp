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
    path: '**',
    redirectTo: 'home',
  },
];
