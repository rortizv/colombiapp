import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonMenuButton, IonSpinner, LoadingController, IonSearchbar, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { City } from '../interfaces/city.interface';
import { ApicolombiaService } from '../services/apicolombia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonButtons, IonMenuButton, IonSpinner, IonSearchbar, IonList, IonItem, IonLabel]
})
export class CitiesPage implements OnInit, OnDestroy {

  isLoading: boolean = false;
  cities: City[] = [];
  filteredCities: City[] = [];
  searchCityByNameSubscription: Subscription = new Subscription();

  constructor(private apiColombiaService: ApicolombiaService,
              private loadingController: LoadingController) { }

  ngOnInit() {
    console.log('CitiesPage ngOnInit');
  }

  ngOnDestroy() {
    this.searchCityByNameSubscription.unsubscribe();
  }

  async filterCities(event: any) {
    // this.isLoading = true;
    // const loading = await this.loadingController.create({
    //   message: 'Cargando C...',
    // });
    // await loading.present();

    const searchValue = event.target.value;

    if (searchValue === '' || searchValue === null || searchValue === undefined || searchValue.length < 4) {
      this.filteredCities = [];
      console.log(searchValue)
      //loading.dismiss();
      return;
    }
    this.searchCityByNameSubscription = this.apiColombiaService.searchCityByName(searchValue).subscribe({
      next: (data: City[]) => {
        console.log('Ciudades:', data);
        this.cities = data;
        this.filteredCities = data;
        this.isLoading = true;
      },
      error: (error: any) => {
        console.error('Error al buscar ciudades:', error);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
        //loading.dismiss();
      }
    });
  }

  openCity(city: City) {
    console.log('Open City:', city);
  }

}
