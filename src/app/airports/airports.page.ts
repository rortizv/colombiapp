import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonMenuButton, IonSpinner, LoadingController, IonSearchbar, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { Subscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Airport } from '../interfaces/airport.interface';
import { ApicolombiaService } from '../services/apicolombia.service';
import { ToolsService } from '../services/tools.service';

@Component({
  selector: 'app-airports',
  templateUrl: './airports.page.html',
  styleUrls: ['./airports.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonButtons, IonMenuButton, IonSpinner, IonSearchbar, IonList, IonItem, IonLabel]
})
export class AirportsPage implements OnInit, OnDestroy {

  public isLoading: boolean = false;
  public searchTerm: string = '';
  public airports: Airport[] = [];
  public filteredAirports: Airport[] = [];
  public getAirportsSubscription: Subscription = new Subscription();

  constructor(private apiColombiaService: ApicolombiaService,
              private toolsService: ToolsService,
              private loadingController: LoadingController,
              private router: Router) { }

  ngOnInit() {
    this.getAirports();
  }

  ngOnDestroy() {
    this.getAirportsSubscription.unsubscribe();
  }

  async getAirports() {
    this.isLoading = true;

    const loading = await this.loadingController.create({
      message: 'Cargando aeropuertos...',
    });
    await loading.present();

    this.getAirportsSubscription = this.apiColombiaService.getAirports()
      .subscribe({
        next: (data: Airport[]) => {
          this.filteredAirports = data;
          this.airports = data;
        },
        error: (error: any) => {
          this.toolsService.presentToast('No se pudieron cargar los aeropuertos.', 'toast-error');
          this.isLoading = false;
          loading.dismiss();
        },
        complete: () => {
          this.isLoading = false;
          loading.dismiss();
        }
      });
  }

  async searchAirport(event: any) {
    const searchTerm = event.target.value.toLowerCase().trim();

    if (!searchTerm) {
      this.filteredAirports = this.airports;
      return;
    }

    this.filteredAirports = this.airports.filter((airport: Airport) => {
      return airport.name.toLowerCase().includes(searchTerm);
    });
  }

  openAirport(airport: Airport) {
    console.log('Airport:', airport);
  }

}
