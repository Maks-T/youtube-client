import { Component, OnInit } from '@angular/core';
import { mockResponse } from 'src/app/app.constants';
import { IResponse } from '../search-response.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  mockResponse: IResponse = mockResponse;

  constructor() {}
}
