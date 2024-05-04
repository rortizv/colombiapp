import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonImg, IonButton, IonRow, IonCol, IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonLabel } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonMenuButton,
    IonLabel,
    IonRow,
    IonCol,
    IonImg,
    IonButton,
    RouterLink
  ]
})
export class HomePage {

  constructor() { }

}
