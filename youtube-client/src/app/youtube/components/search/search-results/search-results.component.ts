import { Component, OnDestroy, OnInit } from '@angular/core';
import { mockResponseNull } from 'src/app/app.constants';
import { SearchService } from 'src/app/core/services/search.service';

import { TypeSort } from '../../../../shared/models/type-sort.model';
import { IItem } from '../../../models/search-item.model';
import { IResponse } from '../../../models/search-response.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  response: IResponse = mockResponseNull;

  sortDateUp = false;

  sortCountViewsUp = false;

  isLoading = false;

  searchText: string = '';

  searchFilterText: string = '';

  typeSort: string = '';

  constructor(public searchService: SearchService) {}

  ngOnInit() {
    this.searchService.searchText$.subscribe((searchText) => {
      this.searchText = searchText;
      this.onSearch();
    });

    this.searchService.searchFilterText$.subscribe((searchFilterText) => {
      this.searchFilterText = searchFilterText;
    });

    this.searchService.typeSort$.subscribe((typeSort) => {
      this.typeSort = typeSort;
      this.sortByType();
      this.sortByDirection();
    });

    this.searchService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  ngOnDestroy() {
    /*
    this.searchService.searchText$.unsubscribe();
    this.searchService.searchFilterText$.unsubscribe();
    this.searchService.typeSort$.unsubscribe();
    */
  }

  sortByDirection(): void {
    if (this.typeSort === TypeSort.dateUp) {
      this.response.items = this.response.items.sort(
        (a: IItem, b: IItem) => Number(new Date(b.snippet.publishedAt))
          - Number(new Date(a.snippet.publishedAt)),
      );
    }

    if (this.typeSort === TypeSort.dateDown) {
      this.response.items = this.response.items.sort(
        (a: IItem, b: IItem) => Number(new Date(a.snippet.publishedAt))
          - Number(new Date(b.snippet.publishedAt)),
      );
    }

    if (this.typeSort === TypeSort.countViewsUp) {
      this.response.items = this.response.items.sort(
        (a: IItem, b: IItem) => Number(b.statistics.viewCount) - Number(a.statistics.viewCount),
      );
    }

    if (this.typeSort === TypeSort.countViewsDown) {
      this.response.items = this.response.items.sort(
        (a: IItem, b: IItem) => Number(a.statistics.viewCount) - Number(b.statistics.viewCount),
      );
    }
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
        this.response = res;
      });
    } else {
      this.response = JSON.parse(JSON.stringify(mockResponseNull));
    }
  }
}
