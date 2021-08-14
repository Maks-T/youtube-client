import { Component, Output, EventEmitter } from '@angular/core';
import { TypeSort } from '../../../shared/models/type-sort.model';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent {
  TS = TypeSort;

  typeSort = '';

  inputSearchFilter = '';

  constructor(public searchService: SearchService) {}

  onChangeInput(): void {
    this.searchService.searchFilterText.next(this.inputSearchFilter);
  }

  sortByType(typeSort: TypeSort): void {
    this.searchService.typeSort.next(typeSort);

    this.typeSort = typeSort;
  }
}
