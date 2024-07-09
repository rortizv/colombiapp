import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons } from '@ionic/angular/standalone';

@Component({
  selector: 'app-nearby-cities',
  templateUrl: './nearby-cities.page.html',
  styleUrls: ['./nearby-cities.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton, IonButtons]
})
export class NearbyCitiesPage implements OnInit {

  nearbyCities: any;
  userLocation: any;

  latitude: number = 0;
  longitude: number = 0;

  constructor() { }

  ngOnInit() {
    console.log('NearbyCitiesPage.ngOnInit');
    this.getNearbyCities();
  }

  async getNearbyCities() {
    // get user location using geolocation API
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      // Use latitude and longitude to get nearby cities
      // ...

    }, (error) => {
      console.log('Error getting user location:', error);
    });
  }

}
