import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonCardContent, IonItem, IonLabel, IonNote, IonAccordion, IonAccordionGroup, IonList } from '@ionic/angular/standalone';
import { map } from 'rxjs';
import { City } from '../interfaces/city.interface';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.page.html',
  styleUrls: ['./city-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonCard, IonCardContent, IonItem, IonList, IonLabel, IonNote, IonAccordion, IonAccordionGroup],
  providers: [NavParams]
})
export class CityDetailPage implements OnInit {

  public city!: City;

  constructor(private router: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    let city = this.router.paramMap.pipe(
      map(() => window.history.state)
    );
    city.subscribe(({ city }) => {
      this.city = city;
    });
  }

  goBack() {
    this.location.back();
  }

}
