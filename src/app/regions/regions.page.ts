import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, LoadingController, IonSpinner, IonModal, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';

import { ApicolombiaService } from '../services/apicolombia.service';

import { Region } from '../interfaces/region.interface';
import { Department, DepartmentsByRegionResponse } from '../interfaces/department.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.page.html',
  styleUrls: ['./regions.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonMenuButton,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonSpinner,
    IonButton,
    IonModal,
    IonList,
    IonItem,
    IonLabel
  ]
})
export class RegionsPage implements OnInit, OnDestroy {

  regions: Region[] = [];
  getRegionsSubscription: Subscription = new Subscription();
  getDepartmentsByRegionSubscription: Subscription = new Subscription();
  isLoading: boolean = false;
  isModalOpen: boolean = false;
  departments: Department[] = [];

  constructor(private apiColombiaService: ApicolombiaService,
              private loadingController: LoadingController,
              private router: Router) { }

  ngOnInit() {
    this.getRegions();
  }

  ngOnDestroy() {
    this.isModalOpen = false;
    this.getRegionsSubscription.unsubscribe();
    this.getDepartmentsByRegionSubscription.unsubscribe();
  }

  async getRegions() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Cargando Regiones...',
    });
    await loading.present();

    this.getRegionsSubscription = this.apiColombiaService.getRegions().subscribe({
      next: (data: Region[]) => {
        this.regions = data;
        this.setImages();
        this.isLoading = false;
        loading.dismiss();
      },
      error: (error: any) => {
        console.error('Error cargando info de Regiones', error);
        this.isLoading = false;
        loading.dismiss();
      }
    });
  }

  setImages() {
    this.regions.forEach((region: Region) => {
      switch (region.id) {
        case 1:
          region.imageUrl = 'assets/images/region-caribe.png';
          break;
        case 2:
          region.imageUrl = 'assets/images/region-pacifico.png';
          break;
        case 3:
          region.imageUrl = 'assets/images/region-orinoquia.png';
          break;
        case 4:
          region.imageUrl = 'assets/images/region-amazonia.png';
          break;
        case 5:
          region.imageUrl = 'assets/images/region-andina.png';
          break;
        case 6:
          region.imageUrl = 'assets/images/region-insular.png';
      }
    });
  }

  async getDepartmentsByRegion(regionId: number) {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Cargando Departamentos...',
    });
    await loading.present();

    this.getDepartmentsByRegionSubscription = this.apiColombiaService.getDepartmentsByRegion(regionId).subscribe({
      next: (data: DepartmentsByRegionResponse) => {
        this.departments = data.departments;
        this.isLoading = false;
        loading.dismiss();
      },
      error: (error: any) => {
        console.error('Error cargando info de Departamentos', error);
        this.isLoading = false;
        loading.dismiss();
      }
    });
  }

  openDepartment(department: Department) {
    this.isModalOpen = false;
    this.router.navigate(['/department-detail'], { state: { department } });
  }

  openDepartmentsByRegionModal(isOpen: boolean, region?: Region) {
    this.isModalOpen = isOpen;

    if (!isOpen) {
      this.isModalOpen = false;
      console.log("Modal closed. isModalOpen:", this.isModalOpen);
    }
    if (isOpen && region) this.getDepartmentsByRegion(region.id);
  }

}
