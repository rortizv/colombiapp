import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonNote, IonToolbar, IonButtons, IonMenuButton, IonSpinner, IonAccordion, IonAccordionGroup, IonItem, LoadingController, IonLabel, IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle, IonSearchbar } from '@ionic/angular/standalone';
import { Observable, Subscription, forkJoin } from 'rxjs';

import { ApicolombiaService } from '../services/apicolombia.service';

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

  private getDepartmentsSubscription:         Subscription = new Subscription();

  public departments: Department[] = [];
  public filteredDepartments: Department[] = [];
  public cities: City[] = [];
  public isLoading: boolean = false;

  constructor(private apiColombiaService: ApicolombiaService,
              private loadingController: LoadingController) { }

  ngOnInit() {
    this.getDepartments();
  }

  ngOnDestroy() {
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
        this.departments = data;
        this.filteredDepartments = data;
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
