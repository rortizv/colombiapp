import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonNote, IonToolbar, IonButtons, IonMenuButton, IonAccordion, IonAccordionGroup, IonItem, LoadingController, IonLabel, IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle, IonSearchbar } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';

import { ApicolombiaService } from '../services/apicolombia.service';
import { Department } from '../interfaces/department.interface';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.page.html',
  styleUrls: ['./departments.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonNote, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle, IonSearchbar]
})
export class DepartmentsPage implements OnInit, OnDestroy {
  private getDepartmentsSubscription?: Subscription;

  public departments: Department[] = [];
  public filteredDepartments: Department[] = [];
  public isLoading: boolean = false;

  constructor(
    private apiColombiaService: ApicolombiaService,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.loadDepartments();
  }

  ngOnDestroy() {
    this.getDepartmentsSubscription?.unsubscribe();
  }

  async loadDepartments() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Cargando Departamentos...',
    });
    await loading.present();

    this.getDepartmentsSubscription = this.apiColombiaService.getDepartments().subscribe({
      next: (departments) => {
        this.departments = departments;
        this.filteredDepartments = departments;
        this.assignImages();
      },
      error: (error) => {
        console.error('Error cargando Departamentos:', error);
      },
      complete: () => {
        this.isLoading = false;
        loading.dismiss();
      },
    });
  }

  searchDepartment(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase().trim();

    this.filteredDepartments = searchTerm
      ? this.departments.filter((department) =>
        department.name.toLowerCase().includes(searchTerm)
      )
      : this.departments;
  }

  private assignImages() {
    this.departments.forEach((department) => {
      department.imageUrl = `assets/images/regions/${this.formatImageName(department.name)}.png`;
    });
  }

  private formatImageName(name: string): string {
    return name.toLowerCase().trim().replace(/\s+/g, '-');
  }

}
