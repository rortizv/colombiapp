import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonMenuButton, IonSpinner, LoadingController, IonSearchbar, IonList, IonItem, IonLabel, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonNote, IonAccordionGroup, IonAccordion } from '@ionic/angular/standalone';
import { Subscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { ApicolombiaService } from '../services/apicolombia.service';
import { ToolsService } from '../services/tools.service';
import { ConstitutionArticle } from '../interfaces/constitution-article.interface';

@Component({
  selector: 'app-constitution-articles',
  templateUrl: './constitution-articles.page.html',
  styleUrls: ['./constitution-articles.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonButtons, IonMenuButton, IonSpinner, IonSearchbar, IonList, IonItem, IonLabel, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonNote, IonAccordionGroup, IonAccordion]
})
export class ConstitutionArticlesPage implements OnInit, OnDestroy {

  public initialState: ConstitutionArticle = {
    id: 0,
    title: '',
    content: '',
    titleNumber: 0,
    chapterNumber: 0,
    chapter: '',
    articleNumber: 0
  };
  public isLoading: boolean = false;
  public searchTerm: string = '';
  public article: ConstitutionArticle = this.initialState;
  public searchArticleByIdSubscription: Subscription = new Subscription();
  private searchValue$ = new Subject<string>();
  private searchSubscription: Subscription | undefined;

  constructor(private apiColombiaService: ApicolombiaService,
    private toolsService: ToolsService,
    private loadingController: LoadingController,
    private router: Router) { }

  ngOnInit() {
    this.searchSubscription = this.searchValue$
      .pipe(debounceTime(500))
      .subscribe(searchValue => {
        this.searchByArticle(searchValue);
      });
  }

  ngOnDestroy() {
    this.searchArticleByIdSubscription.unsubscribe();
    this.searchSubscription?.unsubscribe();
  }

  async searchByArticle(searchValue: string) {
    if (!searchValue || searchValue.length < 1) {
      this.article = this.initialState;
      return;
    }

    const searchId = Number(searchValue);
    if (isNaN(searchId)) {
      this.toolsService.presentToast('Invalid article ID.', 'toast-error');
      return;
    }

    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Buscando artículo...',
    });
    await loading.present();

    this.searchArticleByIdSubscription = this.apiColombiaService.getArticleById(searchId)
      .subscribe({
        next: (data: ConstitutionArticle) => {
          this.article = data;
          this.isLoading = false;
          loading.dismiss();
        },
        error: (error: any) => {
          this.toolsService.presentToast('No hay artículo que coincida con su búsqueda.', 'toast-error');
          this.isLoading = false;
          loading.dismiss();
        },
        complete: () => {
          this.isLoading = false;
          loading.dismiss();
        }
      });
  }

  onSearchInput(event: any) {
    this.searchValue$.next(event.target.value);
  }

}
