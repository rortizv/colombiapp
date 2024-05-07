import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonNote, IonToolbar, IonButtons, IonMenuButton, IonSpinner, IonAccordion, IonAccordionGroup, IonItem, LoadingController, IonLabel, IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle, IonSearchbar } from '@ionic/angular/standalone';
import { Observable, Subscription, forkJoin } from 'rxjs';

import { ApicolombiaService } from '../services/apicolombia.service';

import { Region } from '../interfaces/region.interface';
import { Department } from '../interfaces/department.interface';
import { City } from '../interfaces/city.interface';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.page.html',
  styleUrls: ['./departments.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonNote, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonSpinner, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle, IonSearchbar]
})
export class DepartmentsPage implements OnInit, OnDestroy {

  getCitiesSubscription: Subscription = new Subscription();
  getCityByIdSubscription: Subscription = new Subscription();
  getDepartmentsSubscription: Subscription = new Subscription();
  getDepartmentsByRegionSubscription: Subscription = new Subscription();

  departments: Department[] = [];
  cities: City[] = [];
  isLoading: boolean = false;
  filteredDepartments: Department[] = [];

  constructor(private apiColombiaService: ApicolombiaService,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.getDepartments();
  }

  ngOnDestroy() {
    this.getCitiesSubscription.unsubscribe();
    this.getCityByIdSubscription.unsubscribe();
    this.getDepartmentsByRegionSubscription.unsubscribe();
    this.getDepartmentsSubscription.unsubscribe();
  }

  async getDepartments() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Cargando Departamentos...',
    });
    await loading.present();

    this.getDepartmentsSubscription = this.apiColombiaService.getDepartments().subscribe({
      next: (data: any) => {
        console.log('Departamentos:', data);
        this.departments = data;
        this.filteredDepartments = data;
        this.setCities();
        this.setImages();
        this.isLoading = false;
        loading.dismiss();
      },
      error: (error: any) => {
        console.error('Error cargando Departamentos:', error);
        this.isLoading = false;
        loading.dismiss();
      }
    });
  }

  async getCityById(cityId: number) {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Cargando Ciudades...',
    });
    await loading.present();

    this.getCityByIdSubscription = this.apiColombiaService.getCityById(cityId).subscribe({
      next: (data: City) => {
        this.setCities();
        this.isLoading = false;
        loading.dismiss();
      },
      error: (error: any) => {
        console.error('Error cargando Ciudad por Id:', error);
        this.isLoading = false;
        loading.dismiss();
      }
    });
  }

  async getDepartmentsByRegion(region: Region) {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Cargando Departamentos por Region...',
    });
    await loading.present();

    this.getDepartmentsByRegionSubscription = this.apiColombiaService.getDepartmentsByRegion(region.id).subscribe({
      next: (data: any) => {

        loading.dismiss();
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error cargando Departamentos por Region:', error);
        loading.dismiss();
        this.isLoading = false;
      }
    });
  }


  async setCities() {
    const observables: Observable<any>[] = [];

    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Cargando Ciudades capitales...',
    });
    await loading.present();

    this.departments.forEach((department: Department) => {
      const observable = this.apiColombiaService.getCityById(department.cityCapitalId);
      observables.push(observable);
    });

    const combinedObservable = forkJoin(observables);

    this.getCityByIdSubscription = combinedObservable.subscribe({
      next: (cities: any[]) => {
        cities.forEach((city: any, index: number) => {
          this.departments[index].capitalCity = city.name;
        });
      },
      error: (error: any) => {
        console.error('Error loading cities:', error);
      },
      complete: () => {
        loading.dismiss();
        this.getCityByIdSubscription.unsubscribe();
        this.isLoading = false;
      }
    });
  }

  async searchDepartment(event: any) {
    const searchTerm = event.target.value.toLowerCase().trim();

    if (!searchTerm) {
      this.filteredDepartments = this.departments;
      return;
    }

    this.filteredDepartments = this.departments.filter((department: Department) => {
      return department.name.toLowerCase().includes(searchTerm);
    });
  }

  setImages() {
    this.filteredDepartments.forEach((department: Department) => {
      department.imageUrl = `assets/images/regions/${department.name.toLowerCase().trim().replace(/ /g, '-')}.png`;
    });
  }

}
