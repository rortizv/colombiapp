import { Component } from '@angular/core';
import { IonMenu, IonIcon, IonMenuToggle, IonLabel, IonItem, IonListHeader, IonContent, IonList } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    IonMenu,
    IonMenuToggle,
    IonLabel,
    IonIcon,
    IonItem,
    IonListHeader,
    IonContent,
    IonList,
    NgFor
  ]
})
export class MenuComponent {

  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Info de Colombia', url: '/about', icon: 'information-circle' },
    { title: 'Regiones', url: '/regions', icon: 'layers' },
    { title: 'Departamentos', url: '/departments', icon: 'grid' },
    { title: 'Ciudades', url: '/cities', icon: 'business' },
    { title: 'Presidentes', url: '/presidents', icon: 'man' },
    { title: 'Aeropuertos', url: '/airports', icon: 'airplane' },
    { title: 'Artículos de la Constitución', url: '/constitution-articles', icon: 'book' },
    { title: 'Estaciones de radio', url: '/radio-stations', icon: 'radio' },
  ];

  constructor(private router: Router) {

  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }

}
