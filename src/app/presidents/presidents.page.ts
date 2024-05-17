import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, LoadingController, IonSearchbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonNote, IonImg, IonInfiniteScroll, IonInfiniteScrollContent, IonAvatar } from '@ionic/angular/standalone';
import { President } from '../interfaces/president.interface';
import { ApicolombiaService } from '../services/apicolombia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-presidents',
  templateUrl: './presidents.page.html',
  styleUrls: ['./presidents.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonSearchbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonNote, IonImg, IonInfiniteScroll, IonInfiniteScrollContent, IonAvatar]
})
export class PresidentsPage implements OnInit, OnDestroy {

  private getPresidentsSubscription: Subscription = new Subscription();
  public presidents: President[] = [];
  public filteredPresidents: President[] = [];
  public isLoading: boolean = false;
  public page: number = 1;
  public pageSize: number = 5;

  @ViewChild(IonContent, { static: false }) ionContent!: IonContent;

  constructor(private apiColombiaService: ApicolombiaService,
              private loadingController: LoadingController) { }

  ngOnInit() {
    this.getPresidentsPaged();
  }

  ngOnDestroy() {
    this.getPresidentsSubscription.unsubscribe();
  }

  async getPresidentsPaged() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Cargando Presidentes...',
    });
    await loading.present();

    this.getPresidentsSubscription = this.apiColombiaService.getPresidentsPaged(this.page, this.pageSize)
      .subscribe({
        next: async ({ data }: any) => {
          this.presidents = this.presidents.concat(data);
          this.filteredPresidents = this.filteredPresidents.concat(data);
          this.setFullName();
          this.page++;
          this.isLoading = false;
          loading.dismiss();
          setTimeout(() => {
            this.scrollToLastItem();
          }, 100);
        },
        error: (error: any) => {
          console.error('Error cargando Presidentes:', error);
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

  async onIonInfinite(event: any) {
    this.getPresidentsPaged();
    setTimeout(() => {
      (event as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  async scrollToLastItem() {
    const scrollElement = await this.ionContent.getScrollElement();
    const lastItem = scrollElement.querySelector('ion-card:last-child');
    if (lastItem) {
      const lastItemOffsetTop = lastItem.scrollTop;
      this.ionContent.scrollToPoint(0, lastItemOffsetTop, 0);
    }
  }

  setDefaultImage(event: any) {
    event.target.src = 'assets/images/no-person.png';
  }
}
