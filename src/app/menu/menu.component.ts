import { Component } from '@angular/core';
import { IonMenu, IonIcon, IonMenuToggle, IonLabel, IonItem, IonNote, IonListHeader, IonContent, IonList } from '@ionic/angular/standalone';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
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
    IonNote,
    IonListHeader,
    IonContent,
    IonList,
    RouterLink,
    RouterLinkActive,
    NgFor
  ]
})
export class MenuComponent {

  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Info de Colombia', url: '/about', icon: 'information-circle' }
  ];

  constructor(private router: Router) {

  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }

}
