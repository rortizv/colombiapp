import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-radio-stations',
  templateUrl: './radio-stations.page.html',
  styleUrls: ['./radio-stations.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton]
})
export class RadioStationsPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("Radio stations page loaded");
  }

}
