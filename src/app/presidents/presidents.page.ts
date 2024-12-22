import { Component, OnInit, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton,
  LoadingController, IonSearchbar, IonCard, IonCardContent, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonAccordionGroup, IonAccordion, IonItem,
  IonLabel, IonNote, IonImg, IonAvatar
} from '@ionic/angular/standalone';
import { President } from '../interfaces/president.interface';
import { ApicolombiaService } from '../services/apicolombia.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-presidents',
  templateUrl: './presidents.page.html',
  styleUrls: ['./presidents.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonButtons, IonMenuButton, IonSearchbar, IonCard, IonCardContent, IonCardHeader,
    IonCardTitle, IonCardSubtitle, IonAccordionGroup, IonAccordion, IonItem,
    IonLabel, IonNote, IonImg, IonAvatar
  ]
})
export class PresidentsPage implements OnInit {

  public presidents: President[] = [];
  public filteredPresidents: President[] = [];
  public isLoading = false;

  @ViewChild(IonContent, { static: false }) ionContent!: IonContent;

  constructor(
    private apiColombiaService: ApicolombiaService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.loadPresidents();
  }

  // Load presidents data with pagination
  async loadPresidents() {
    if (this.isLoading) return;

    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Cargando Presidentes...',
    });
    await loading.present();

    try {
      // Fetch all presidents
      const allPresidents: President[] = await firstValueFrom(this.apiColombiaService.getPresidents());

      // Update the list of presidents and filteredPresidents
      this.presidents = allPresidents;
      this.filteredPresidents = allPresidents;

      // Prepare display data
      this.updateFullNames();
    } catch (error) {
      console.error('Error al cargar Presidentes:', error);
    } finally {
      this.isLoading = false;
      await loading.dismiss();
    }
  }

  // Set the full name for presidents
  updateFullNames() {
    this.presidents.forEach((president) => {
      president.fullName = `${president.name} ${president.lastName}`.trim();
    });
  }

  // Search presidents by name or last name
  searchPresident(event: any) {
    const searchTerm = event.target.value?.toLowerCase().trim() || '';
    this.filteredPresidents = searchTerm
      ? this.presidents.filter((president) =>
        president.fullName.toLowerCase().includes(searchTerm)
      )
      : [...this.presidents];
  }

  // Handle infinite scroll event
  async onIonInfinite(event: InfiniteScrollCustomEvent) {
    await this.loadPresidents();
    event.target.complete();
  }

  // Fallback to default image
  setDefaultImage(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/no-person.png';
  }
}
