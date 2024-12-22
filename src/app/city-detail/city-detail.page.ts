import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItem, IonLabel, IonNote, IonList } from '@ionic/angular/standalone';
import { map } from 'rxjs';
import { CityDetail } from '../interfaces/city.interface';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.page.html',
  styleUrls: ['./city-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonItem, IonList, IonLabel, IonNote],
  providers: [NavParams]
})
export class CityDetailPage implements OnInit {

  public city!: CityDetail;

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
