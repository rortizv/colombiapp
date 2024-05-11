import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, LoadingController, IonSearchbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonNote } from '@ionic/angular/standalone';
import { President } from '../interfaces/president.interface';
import { ApicolombiaService } from '../services/apicolombia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-presidents',
  templateUrl: './presidents.page.html',
  styleUrls: ['./presidents.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonSearchbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonNote]
})
export class PresidentsPage implements OnInit, OnDestroy {

  private getPresidentsSubscription: Subscription = new Subscription();
  public presidents: President[] = [];
  public filteredPresidents: President[] = [];
  public isLoading: boolean = false;

  constructor(private apiColombiaService: ApicolombiaService,
              private loadingController: LoadingController) { }

  ngOnInit() {
    this.getPresidents();
  }

  ngOnDestroy() {
    this.getPresidentsSubscription.unsubscribe();
  }

  async getPresidents() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Cargando Presidentes...',
    });
    await loading.present();

    this.getPresidentsSubscription = this.apiColombiaService.getPresidents().subscribe({
      next: (data: President[]) => {
        this.presidents = data;
        this.filteredPresidents = data;
        this.setFullName();
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

  setFullName() {
    this.presidents.forEach((president: President) => {
      president.fullName = `${president.name} ${president.lastName}`;
    });
    this.filteredPresidents = this.presidents;
  }

  async searchPresident(event: any) {
    const searchTerm = event.target.value.toLowerCase().trim();

    if (!searchTerm) {
      this.filteredPresidents = this.presidents;
      return;
    }

    this.filteredPresidents = this.presidents.filter((president: President) => {
      return president.fullName.toLowerCase().includes(searchTerm);
    });
  }

}
