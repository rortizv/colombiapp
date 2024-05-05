import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, LoadingController, IonSpinner } from '@ionic/angular/standalone';
import { ApicolombiaService } from '../services/apicolombia.service';
import { Subscription } from 'rxjs';
import { Region } from '../interfaces/region.interface';

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
    IonSpinner
  ]
})
export class RegionsPage implements OnInit {

  regions: Region[] = [];
  getRegionsSubscription: Subscription = new Subscription();
  isLoading: boolean = false;

  constructor(private apiColombiaService: ApicolombiaService,
              private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.getRegions();
  }

  async getRegions() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Loading Regions...',
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
        console.error('Error fetching Regions info:', error);
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

}
