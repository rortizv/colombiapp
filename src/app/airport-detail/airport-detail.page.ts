import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonCardContent, IonItem, IonLabel, IonNote, IonAccordion, IonAccordionGroup, IonList } from '@ionic/angular/standalone';
import { map } from 'rxjs';
import { Airport } from '../interfaces/airport.interface';

@Component({
  selector: 'app-airport-detail',
  templateUrl: './airport-detail.page.html',
  styleUrls: ['./airport-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonCard, IonCardContent, IonItem, IonList, IonLabel, IonNote, IonAccordion, IonAccordionGroup],
  providers: [NavParams]
})
export class AirportDetailPage implements OnInit {

  public airport!: Airport;

  constructor(private router: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    let airport = this.router.paramMap.pipe(
      map(() => window.history.state)
    );
    airport.subscribe(({ airport }) => {
      this.airport = airport;
    });
  }

  goBack() {
    this.location.back();
  }

}
