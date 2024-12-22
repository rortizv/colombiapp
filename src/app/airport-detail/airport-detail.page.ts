import { Component, OnInit } from '@angular/core';
import { Location, NgIf, AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItem, IonList, IonLabel, IonNote } from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Airport } from '../interfaces/airport.interface';

@Component({
  selector: 'app-airport-detail',
  templateUrl: './airport-detail.page.html',
  styleUrls: ['./airport-detail.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButtons, IonBackButton, IonItem, IonList,
    IonLabel, IonNote, NgIf, AsyncPipe
  ],
})
export class AirportDetailPage implements OnInit {

  public airport$!: Observable<Airport>;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.airport$ = this.route.paramMap.pipe(
      map(() => {
        const state = window.history.state;
        return state.airport as Airport;
      })
    );
  }

  goBack() {
    this.location.back();
  }

}
