import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SearchService } from 'src/app/core/services/search.service';
import { IAppState } from 'src/app/redux';
import { SetYoutubeItems } from 'src/app/redux/actions/youtube.action';
import { ICustomItem } from 'src/app/youtube/models/custom-item.model';
import { getAllItems } from 'src/app/redux/selectors/items.selector';

import { TypeSort } from '../../../../shared/models/type-sort.model';
import { IItem } from '../../../models/search-item.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  // response: IResponse = mockResponseNull;

  items$?: Observable<(IItem | ICustomItem)[]>;

  sortDateUp = false;

  sortCountViewsUp = false;

  isLoading = false;

  searchText: string = '';

  searchFilterText: string = '';

  typeSort: string = '';

  destroyed$ = new Subject<boolean>();

  constructor(
    public searchService: SearchService,
    private router: Router,
    private store: Store<IAppState>,
  ) {}

  ngOnInit() {
    this.items$ = this.store.pipe(
      takeUntil(this.destroyed$),
      select(getAllItems),
    );

    this.searchService.searchText$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((searchText) => {
        this.searchText = searchText;
        this.onSearch();
      });

    this.searchService.searchFilterText$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((searchFilterText) => {
        this.searchFilterText = searchFilterText;
      });

    this.searchService.typeSort$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((typeSort) => {
        this.typeSort = typeSort;
        this.sortByType();
      });

    this.searchService.isLoading$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  sortByType(): void {
    if (this.typeSort === TypeSort.date) {
      this.sortDateUp = !this.sortDateUp;
      this.typeSort = this.sortDateUp ? TypeSort.dateUp : TypeSort.dateDown;
    }

    if (this.typeSort === TypeSort.countViews) {
      this.sortCountViewsUp = !this.sortCountViewsUp;
      this.typeSort = this.sortCountViewsUp
        ? TypeSort.countViewsUp
        : TypeSort.countViewsDown;
    }

    if (this.typeSort === TypeSort.wordOrSentence) {
      this.typeSort = TypeSort.wordOrSentence;
    }
  }

  onSearch(): void {
    if (this.searchText) {
      const searchResult$ = this.searchService.fetchVideos(this.searchText);

      searchResult$.subscribe((res) => {
        this.store.dispatch(new SetYoutubeItems(res.items));
      });
    }
  }

  onAddCustomCard(): void {
    this.router.navigate(['search', 'admin']);
  }
}
