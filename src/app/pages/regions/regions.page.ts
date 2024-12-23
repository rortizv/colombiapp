import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonCard, IonCardHeader, IonCardContent, IonCardTitle, LoadingController, IonModal, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { Subject, firstValueFrom } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ApicolombiaService } from '../../core/services/apicolombia.service';

import { Region } from '../../core/interfaces/region.interface';
import { Department, DepartmentDetail, DepartmentsByRegionResponse } from '../../core/interfaces/department.interface';
import { Router } from '@angular/router';
import { ToolsService } from '../../core/services/tools.service';

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
    IonButton,
    IonModal,
    IonList,
    IonItem,
    IonLabel,
  ],
})
export class RegionsPage implements OnInit, OnDestroy {
  @ViewChild('modal') modal: ElementRef | any;
  public isLoading: boolean = false;
  public isModalOpen: boolean = false;
  public regions: Region[] = [];
  public departments: Department[] = [];
  public department: DepartmentDetail = {} as DepartmentDetail;
  private ngUnsubscribe = new Subject<void>();

  private static IMAGE_URLS: Record<number, string> = {
    1: 'assets/images/region-caribe.png',
    2: 'assets/images/region-pacifico.png',
    3: 'assets/images/region-orinoquia.png',
    4: 'assets/images/region-amazonia.png',
    5: 'assets/images/region-andina.png',
    6: 'assets/images/region-insular.png',
  };

  constructor(
    private apiColombiaService: ApicolombiaService,
    private loadingController: LoadingController,
    private toolsService: ToolsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getRegions();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ionViewWillLeave() {
    this.isModalOpen = false;
  }

  async getRegions() {
    await this.presentLoading('Cargando Regiones...');
    this.apiColombiaService
      .getRegions()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data: Region[]) => {
          this.regions = data;
          this.setImages();
        },
        error: (error: any) => this.toolsService.handleError('Error cargando info de Regiones', error),
        complete: () => this.toolsService.dismissLoading(),
      });
  }

  setImages() {
    this.regions.forEach((region: Region) => {
      region.imageUrl = RegionsPage.IMAGE_URLS[region.id] || 'assets/images/default-region.png';
    });
  }

  openDepartmentsByRegionModal(region?: Region) {
    this.isModalOpen = true;

    if (this.isModalOpen && region) this.getDepartmentsByRegion(region.id);
  }

  async getDepartmentsByRegion(regionId: number) {
    await this.presentLoading('Cargando Departamentos...');
    this.apiColombiaService
      .getDepartmentsByRegion(regionId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data: DepartmentsByRegionResponse) => {
          this.departments = data.departments;
        },
        error: (error: any) => this.toolsService.handleError('Error cargando info de Departamentos', error),
        complete: () => this.toolsService.dismissLoading(),
      });
  }

  toggleModal(state: boolean, region?: Region) {
    this.isModalOpen = state;
    if (state && region) {
      this.getDepartmentsByRegion(region.id);
    }
  }

  async openDepartment(department: Department) {
    this.toggleModal(false);
    await this.getDepartmentById(department.id);
  }

  navigate(department: DepartmentDetail) {
    this.router.navigate(['/department-detail'], { state: { department } });
  }

  async getDepartmentById(departmentId: number) {
    try {
      const response = await firstValueFrom(this.apiColombiaService.getDepartmentById(departmentId));
      this.department = response;
      this.navigate(this.department);
    } catch (error) {
      this.toolsService.handleError('Error obteniendo departamento por ID', error);
    }
  }

  private async presentLoading(message: string) {
    const loading = await this.loadingController.create({ message });
    await loading.present();
  }

}
