import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, LoadingController, IonSearchbar, IonList, IonItem, IonLabel, IonSpinner } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { Airport } from '../../core/interfaces/airport.interface';
import { ApicolombiaService } from '../../core/services/apicolombia.service';
import { ToolsService } from '../../core/services/tools.service';

@Component({
  selector: 'app-airports',
  templateUrl: './airports.page.html',
  styleUrls: ['./airports.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonMenuButton,
    IonSearchbar,
    IonList,
    IonItem,
    IonLabel,
    IonSpinner,
  ]
})
export class AirportsPage implements OnInit, OnDestroy {
  public isLoading = false;
  public searchTerm = '';
  public airports: Airport[] = [];
  public filteredAirports: Airport[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private apiColombiaService: ApicolombiaService,
    private toolsService: ToolsService,
    private loadingController: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadAirports();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private async loadAirports() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Cargando aeropuertos...',
    });

    await loading.present();

    const subscription = this.apiColombiaService.getAirports().subscribe({
      next: (data: Airport[]) => {
        this.airports = data;
        this.filteredAirports = data;
      },
      error: (error: any) => {
        this.toolsService.presentToast(
          'No se pudieron cargar los aeropuertos.',
          'toast-error'
        );
        console.error('Error loading airports:', error);
      },
      complete: () => {
        this.isLoading = false;
        loading.dismiss();
      },
    });

    this.subscriptions.push(subscription);
  }

  public searchAirport(event: Event) {
    const target = event.target as HTMLInputElement;
    const searchTerm = target.value?.toLowerCase().trim() || '';

    this.filteredAirports = searchTerm
      ? this.airports.filter((airport) =>
        airport.name.toLowerCase().includes(searchTerm)
      )
      : this.airports;
  }

  public openAirport(airport: Airport) {
    this.router.navigate(['/airport-detail'], { state: { airport } });
  }

}
