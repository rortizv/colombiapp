import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, LoadingController, IonSearchbar, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { Radio } from '../interfaces/radio.interface';
import { ApicolombiaService } from '../services/apicolombia.service';
import { ToolsService } from '../services/tools.service';

@Component({
  selector: 'app-radio-stations',
  templateUrl: './radio-stations.page.html',
  styleUrls: ['./radio-stations.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonSearchbar, IonList, IonItem, IonLabel]
})
export class RadioStationsPage implements OnInit, OnDestroy {

  public isLoading: boolean = false;
  public searchTerm: string = '';
  public radioStations: Radio[] = [];
  public filteredRadioStations: Radio[] = [];
  public getRadioStationsSubscription: Subscription = new Subscription();

  constructor(private apiColombiaService: ApicolombiaService,
    private toolsService: ToolsService,
    private loadingController: LoadingController,
    private router: Router) { }

  ngOnInit() {
    this.getRadioStations();
  }

  ngOnDestroy(): void {
    this.getRadioStationsSubscription.unsubscribe();
  }

  async getRadioStations() {
    this.isLoading = true;

    const loading = await this.loadingController.create({
      message: 'Cargando estaciones de radio...',
    });
    await loading.present();

    this.getRadioStationsSubscription = this.apiColombiaService.getRadioStations()
      .subscribe({
        next: (data: Radio[]) => {
          this.filteredRadioStations = data;
          this.radioStations = data;
        },
        error: (error: any) => {
          this.toolsService.presentToast('No se pudieron cargar las estaciones de radio.', 'toast-error');
          this.isLoading = false;
          loading.dismiss();
        },
        complete: () => {
          this.isLoading = false;
          loading.dismiss();
        }
      });
  }

  async searchRadioStation(event: any) {
    const searchTerm = event.target.value.toLowerCase().trim();

    if (!searchTerm) {
      this.filteredRadioStations = this.radioStations;
      return;
    }

    this.filteredRadioStations = this.radioStations.filter((radioStation: Radio) => {
      return radioStation.name.toLowerCase().includes(searchTerm);
    });
  }

  openRadioStation(radioStation: Radio) {
    this.router.navigate(['/radio-detail'], { state: { radioStation } })
  }

}
