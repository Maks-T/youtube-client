import { Component, Input, OnChanges } from '@angular/core';
import { mockResponse, mockResponseNull } from 'src/app/app.constants';
import { TypeSort } from '../../../../shared/models/type-sort.model';
import { IItem } from '../../../models/search-item.model';
import { IResponse } from '../../../models/search-response.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnChanges {
  mockResponse: IResponse = mockResponseNull;

  @Input() typeSort: string = '';
  @Input() inputText: string = '';
  @Input() searchText: string = '';

  ngOnChanges(): void {
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

    if (this.typeSort === TypeSort.countViews) {
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

    if (this.searchText) {
      this.mockResponse = mockResponse;
    } else {
      this.mockResponse = mockResponseNull;
    }
  }
}
