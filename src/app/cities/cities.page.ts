import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonMenuButton, IonSpinner, LoadingController, IonSearchbar, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { Subscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { City } from '../interfaces/city.interface';
import { ApicolombiaService } from '../services/apicolombia.service';
import { ToolsService } from '../services/tools.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonButtons, IonMenuButton, IonSpinner, IonSearchbar, IonList, IonItem, IonLabel]
})
export class CitiesPage implements OnInit, OnDestroy {

  public isLoading: boolean = false;
  public searchTerm: string = '';
  public filteredCities: City[] = [];
  public searchCityByNameSubscription: Subscription = new Subscription();
  private searchValue$ = new Subject<string>();
  private searchSubscription: Subscription | undefined;

  constructor(private apiColombiaService: ApicolombiaService,
    private toolsService: ToolsService,
    private loadingController: LoadingController,
    private router: Router) { }

  ngOnInit() {
    console.log('CitiesPage ngOnInit');
    this.searchSubscription = this.searchValue$
      .pipe(debounceTime(500))
      .subscribe(searchValue => {
        this.filterCities(searchValue);
      });
  }

  ngOnDestroy() {
    this.searchCityByNameSubscription.unsubscribe();
    this.searchSubscription?.unsubscribe();
  }

  async filterCities(searchValue: string) {
    if (!searchValue || searchValue.length < 4) {
      this.filteredCities = [];
      return;
    }

    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Buscando ciudades...',
    });
    await loading.present();

    this.searchCityByNameSubscription = this.apiColombiaService.searchCityByName(searchValue)
      .subscribe({
        next: (data: City[]) => {
          this.filteredCities = data;
        },
        error: (error: any) => {
          this.toolsService.presentToast('No hay ciudades que coincidan con su búsqueda.', 'toast-error');
          this.filteredCities = [];
          this.isLoading = false;
          loading.dismiss();
        },
        complete: () => {
          this.isLoading = false;
          loading.dismiss();
        }
      });
  }

  onSearchInput(event: any) {
    this.searchValue$.next(event.target.value);
  }

  openCity(city: City) {
    this.router.navigate(['/city-detail'], { state: { city } })
  }

}
