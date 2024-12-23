import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonItem, IonLabel, IonNote, IonList
} from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DepartmentDetail } from '../../core/interfaces/department.interface';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.page.html',
  styleUrls: ['./department-detail.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonButtons, IonBackButton, IonItem, IonList, IonLabel, IonNote
  ]
})
export class DepartmentDetailPage implements OnInit, OnDestroy {

  public department: DepartmentDetail = {} as DepartmentDetail;
  private departmentSubscription?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.departmentSubscription = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))
      .subscribe(({ department }) => {
        if (department) {
          this.department = department;
        } else {
          console.warn('No department data found in navigation state.');
        }
      });
  }

  ngOnDestroy(): void {
    this.departmentSubscription?.unsubscribe();
  }

  goBack(): void {
    this.location.back();
  }

}
