import { Component } from '@angular/core';
import { mockResponse, mockResponseNull } from 'src/app/app.constants';
import { SearchService } from 'src/app/core/services/search.service';
import { TypeSort } from '../../../../shared/models/type-sort.model';
import { IItem } from '../../../models/search-item.model';
import { IResponse } from '../../../models/search-response.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  mockResponse: IResponse = mockResponseNull;

  sortDateUp = false;

  sortCountViewsUp = false;

  searchText: string = '';

  searchFilterText: string = '';

  typeSort: string = '';

  constructor(public searchService: SearchService) {
    searchService.searchText$.subscribe((searchText) => {
      this.searchText = searchText;
      this.onSearch();
    });

    searchService.searchFilterText$.subscribe((searchFilterText) => {
      this.searchFilterText = searchFilterText;
    });

    searchService.typeSort$.subscribe((typeSort) => {
      this.typeSort = typeSort;
      this.sortByType();
      this.sortByDirection();
    });
  }

  sortByDirection(): void {
    if (this.typeSort === TypeSort.dateUp) {
      this.mockResponse.items = this.mockResponse.items.sort(
        (a: IItem, b: IItem) =>
          Number(new Date(b.snippet.publishedAt)) -
          Number(new Date(a.snippet.publishedAt))
      );
    }

    if (this.typeSort === TypeSort.dateDown) {
      this.mockResponse.items = this.mockResponse.items.sort(
        (a: IItem, b: IItem) =>
          Number(new Date(a.snippet.publishedAt)) -
          Number(new Date(b.snippet.publishedAt))
      );
    }

    if (this.typeSort === TypeSort.countViewsUp) {
      this.mockResponse.items = this.mockResponse.items.sort(
        (a: IItem, b: IItem) =>
          Number(b.statistics.viewCount) - Number(a.statistics.viewCount)
      );
    }

    if (this.typeSort === TypeSort.countViewsDown) {
      this.mockResponse.items = this.mockResponse.items.sort(
        (a: IItem, b: IItem) =>
          Number(a.statistics.viewCount) - Number(b.statistics.viewCount)
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
      this.mockResponse = JSON.parse(JSON.stringify(mockResponse));
    } else {
      this.mockResponse = JSON.parse(JSON.stringify(mockResponseNull));
    }
  }
}
