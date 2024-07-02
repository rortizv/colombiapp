import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonAccordion, IonAccordionGroup, IonLabel, IonCardContent, IonImg, IonAvatar, IonCardTitle, IonCardHeader, IonCard, IonMenuButton, IonButtons } from '@ionic/angular/standalone';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonAccordion, IonAccordionGroup, IonLabel, IonCardContent, IonImg, IonAvatar, IonCardTitle, IonCardHeader, IonCard, IonMenuButton, IonButtons]
})
export class MapsPage implements OnInit {

  public isLoading = true;
  maps: any;

  constructor() { }

  ngOnInit() {
    console.log('MapsPage.ngOnInit');
  }

  setDefaultImage(event: any) {
    event.target.src = 'assets/images/no-person.png';
  }

}
