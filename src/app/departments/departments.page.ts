import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonSpinner } from '@ionic/angular/standalone';
import { ApicolombiaService } from '../services/apicolombia.service';
import { Subscription } from 'rxjs';
import { Region } from '../interfaces/region.interface';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.page.html',
  styleUrls: ['./departments.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonSpinner]
})
export class DepartmentsPage implements OnInit {

  isLoading: boolean = false;
  getDepartmentsByRegionSubscription: Subscription = new Subscription();

  constructor(private apiColombiaService: ApicolombiaService) { }

  ngOnInit() {
    console.log('DepartmentsPage ngOnInit');
  }

  getDepartmentsByRegion(region: Region) {
    this.isLoading = true;
    this.getDepartmentsByRegionSubscription = this.apiColombiaService.getDepartmentsByRegion(region.id).subscribe({
      next: (data: any) => {
        console.log('Departments by Region:', data);
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error fetching Departments by Region:', error);
        this.isLoading = false;
      }
    });
  }

}
