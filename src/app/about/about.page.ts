import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonRow, IonCol } from '@ionic/angular/standalone';
import { ColombiaInfo } from '../interfaces/colombia.interface';
import { ApicolombiaService } from '../services/apicolombia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
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
    IonRow,
    IonCol
  ]
})
export class AboutPage implements OnInit, OnDestroy {

  public colombiaInfo: ColombiaInfo = {
    id: 0,
    name: '',
    description: '',
    stateCapital: '',
    surface: 0,
    population: 0,
    languages: [],
    timeZone: '',
    currency: '',
    currencyCode: '',
    currencySymbol: '',
    isoCode: '',
    internetDomain: '',
    phonePrefix: '',
    radioPrefix: '',
    aircraftPrefix: '',
    subRegion: '',
    region: '',
    borders: [],
    flags: [],
  };

  getColombiaInfoSubscription: Subscription = new Subscription();

  constructor(private apiColombiaService: ApicolombiaService) { }

  ngOnInit() {
    this.getColombiaInfo();
  }

  getColombiaInfo() {
    this.getColombiaInfoSubscription = this.apiColombiaService.getColombiaInfo().subscribe({
      next: (data: ColombiaInfo) => {
        this.colombiaInfo = data;
      },
      error: (error: any) => {
        console.error('Error fetching Colombia info:', error);
      }
    });
  }

  ngOnDestroy() {
    this.getColombiaInfoSubscription.unsubscribe();
  }

}
