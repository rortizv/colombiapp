import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, LoadingController, IonSearchbar, IonItem, IonLabel, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonNote } from '@ionic/angular/standalone';
import { Subscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { ApicolombiaService } from '../../core/services/apicolombia.service';
import { ToolsService } from '../../core/services/tools.service';
import { ConstitutionArticle } from '../../core/interfaces/constitution-article.interface';

@Component({
  selector: 'app-constitution-articles',
  templateUrl: './constitution-articles.page.html',
  styleUrls: ['./constitution-articles.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonButtons, IonMenuButton, IonSearchbar, IonItem, IonLabel,
    IonCard, IonCardHeader, IonCardContent, IonCardTitle,
    IonCardSubtitle, IonNote
  ]
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

  public isLoading = false;
  public searchTerm = '';
  public article: ConstitutionArticle = { ...this.initialState };

  private searchValue$ = new Subject<string>();
  private searchSubscription?: Subscription;
  private articleSubscription?: Subscription;

  constructor(
    private apiColombiaService: ApicolombiaService,
    private toolsService: ToolsService,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {
    // Listen to search term changes with a debounce
    this.searchSubscription = this.searchValue$
      .pipe(debounceTime(500))
      .subscribe(searchValue => this.searchByArticle(searchValue));
  }

  ngOnDestroy() {
    this.searchSubscription?.unsubscribe();
    this.articleSubscription?.unsubscribe();
  }

  async searchByArticle(searchValue: string) {
    if (!searchValue.trim()) {
      this.resetArticle();
      return;
    }

    const searchId = Number(searchValue);
    if (isNaN(searchId)) {
      this.toolsService.presentToast('Invalid article ID.', 'toast-error');
      return;
    }

    this.isLoading = true;
    const loading = await this.presentLoading('Buscando artículo...');

    this.articleSubscription?.unsubscribe(); // Prevent duplicate subscriptions
    this.articleSubscription = this.apiColombiaService.getArticleById(searchId)
      .subscribe({
        next: (data: ConstitutionArticle) => {
          this.article = data;
        },
        error: (error: any) => {
          console.error('Error fetching article:', error);
          this.toolsService.presentToast('No hay artículo que coincida con su búsqueda.', 'toast-error');
          this.resetArticle();
        },
        complete: () => {
          this.isLoading = false;
          this.dismissLoading(loading);
        }
      });
  }

  onSearchInput(event: any) {
    const searchTerm = event.target.value;
    this.searchValue$.next(searchTerm);
  }

  private resetArticle() {
    this.article = { ...this.initialState };
    this.isLoading = false;
  }

  private async presentLoading(message: string) {
    const loading = await this.loadingController.create({ message });
    await loading.present();
    return loading;
  }

  private async dismissLoading(loading: HTMLIonLoadingElement) {
    if (loading) {
      try {
        await loading.dismiss();
      } catch (error) {
        console.warn('Loading dismiss error:', error);
      }
    }
  }

}
