import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonRow, IonCol } from '@ionic/angular/standalone';
import { ColombiaInfo } from '../interfaces/colombia.interface';
import { ApicolombiaService } from '../services/apicolombia.service';
import { Subscription } from 'rxjs';
import { IonicSlides } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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

  swiperModules = [IonicSlides];
  slides = [
    {
      name: 'about1',
      path: 'assets/images/about1.png',
    },
    {
      name: 'about2',
      path: 'assets/images/about2.png',
    },
    {
      name: 'about3',
      path: 'assets/images/about3.png',
    },
    {
      name: 'about4',
      path: 'assets/images/about4.png',
    },
  ];

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
