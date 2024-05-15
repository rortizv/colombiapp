import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonRow,
  IonCol,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonHeader,
  IonToolbar,
  IonTitle
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  heartOutline,
  heartSharp,
  archiveOutline,
  archiveSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
  bookmarkOutline,
  bookmarkSharp,
  informationOutline,
  informationCircleOutline,
  homeOutline,
  homeSharp,
  informationCircleSharp,
  layersOutline,
  gridOutline,
  layersSharp,
  gridSharp,
  mapOutline,
  mapSharp,
  businessOutline,
  businessSharp,
  manOutline,
  manSharp,
  airplaneOutline,
  airplaneSharp,
} from 'ionicons/icons';
import { MenuComponent } from './menu/menu.component';

import { register } from 'swiper/element/bundle';
import { injectSpeedInsights } from '@vercel/speed-insights';

register();
injectSpeedInsights();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonHeader,
    IonRow,
    IonCol,
    IonToolbar,
    IonTitle,
    RouterLinkActive,
    CommonModule,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    MenuComponent
  ],
})
export class AppComponent {

  isDesktop: boolean = false;

  constructor() {
    addIcons({
      mailOutline,
      mailSharp,
      paperPlaneOutline,
      paperPlaneSharp,
      heartOutline,
      heartSharp,
      archiveOutline,
      archiveSharp,
      trashOutline,
      trashSharp,
      warningOutline,
      warningSharp,
      bookmarkOutline,
      bookmarkSharp,
      informationOutline,
      informationCircleOutline,
      homeOutline,
      homeSharp,
      informationCircleSharp,
      layersOutline,
      gridOutline,
      layersSharp,
      gridSharp,
      mapSharp,
      mapOutline,
      businessOutline,
      businessSharp,
      manOutline,
      manSharp,
      airplaneOutline,
      airplaneSharp
    });
    this.onResize({ target: window });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isDesktop = event.target.innerWidth > 768;
  }

}
