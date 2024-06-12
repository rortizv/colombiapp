import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonCardContent, IonItem, IonLabel, IonNote, IonAccordion, IonAccordionGroup, IonList } from '@ionic/angular/standalone';
import { map } from 'rxjs';
import { Radio } from '../interfaces/radio.interface';

@Component({
  selector: 'app-radio-detail',
  templateUrl: './radio-detail.page.html',
  styleUrls: ['./radio-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonCard, IonCardContent, IonItem, IonList, IonLabel, IonNote, IonAccordion, IonAccordionGroup],
  providers: [NavParams]
})
export class RadioDetailPage implements OnInit {

  public radioStation!: Radio;

  constructor(private router: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    let radioStation = this.router.paramMap.pipe(
      map(() => window.history.state)
    );
    radioStation.subscribe(({ radioStation }) => {
      this.radioStation = radioStation;
    });
  }

  goBack() {
    this.location.back();
  }

}
