import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, LoadingController, IonSearchbar, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { City } from '../interfaces/city.interface';
import { ApicolombiaService } from '../services/apicolombia.service';
import { ToolsService } from '../services/tools.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonSearchbar, IonList, IonItem, IonLabel],
})
export class CitiesPage implements OnInit, OnDestroy {
  public isLoading = false;
  public searchTerm = '';
  public filteredCities: City[] = [];
  private searchValue$ = new Subject<string>();
  private searchSubscription?: Subscription;
  private fetchCitiesSubscription?: Subscription;

  constructor(
    private apiColombiaService: ApicolombiaService,
    private toolsService: ToolsService,
    private loadingController: LoadingController,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.searchSubscription = this.searchValue$
      .pipe(debounceTime(500))
      .subscribe((searchValue: string) => this.filterCities(searchValue));
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
    this.fetchCitiesSubscription?.unsubscribe();
  }

  async filterCities(searchValue: string): Promise<void> {
    if (!searchValue || searchValue.length < 4) {
      this.filteredCities = [];
      return;
    }

    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Buscando ciudades...',
    });

    await loading.present();

    this.fetchCitiesSubscription = this.apiColombiaService.searchCityByName(searchValue).subscribe({
      next: (cities: City[]) => {
        this.filteredCities = cities;
      },
      error: () => {
        this.toolsService.presentToast('No hay ciudades que coincidan con su búsqueda.', 'toast-error');
        this.filteredCities = [];
        loading.dismiss();
      },
      complete: () => {
        this.isLoading = false;
        loading.dismiss().catch(() => { });
      },
    });
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchValue$.next(input.value.trim());
  }

  openCity(city: City): void {
    this.router.navigate(['/city-detail'], { state: { city } });
  }

}
