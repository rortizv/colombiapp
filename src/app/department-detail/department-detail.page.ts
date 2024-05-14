import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonCardContent, IonItem, IonLabel, IonNote, IonAccordion, IonAccordionGroup, IonList } from '@ionic/angular/standalone';
import { map, Subscription } from 'rxjs';
import { DepartmentDetail } from '../interfaces/department.interface';
import { ApicolombiaService } from '../services/apicolombia.service';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.page.html',
  styleUrls: ['./department-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonCard, IonCardContent, IonItem, IonList, IonLabel, IonNote, IonAccordion, IonAccordionGroup],
  providers: [NavParams]
})
export class DepartmentDetailPage implements OnInit, OnDestroy {

  public department: DepartmentDetail;
  private getDepartmentByIdSubscription: Subscription = new Subscription();

  constructor(private router: ActivatedRoute,
              private location: Location,
              private apiColombiaService: ApicolombiaService) {
                this.department = {} as DepartmentDetail;
              }

  ngOnInit() {
    let department = this.router.paramMap.pipe(
      map(() => window.history.state)
    );
    department.subscribe(({ department }) => {
      console.log(department);
      this.getDepartmentById(department.id);
    });
  }

  ngOnDestroy() {
    this.getDepartmentByIdSubscription.unsubscribe();
  }

  async getDepartmentById(departmentId: number) {
    this.getDepartmentByIdSubscription = await this.apiColombiaService.getDepartmentById(departmentId).subscribe((response) => {
      this.department = response;
    });
  }

  goBack() {
    this.location.back();
  }

}
