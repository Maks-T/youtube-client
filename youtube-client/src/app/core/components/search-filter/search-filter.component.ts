import { Component, Output, EventEmitter } from '@angular/core';
import { TypeSort } from '../../../shared/models/type-sort.model';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent {
  TS = TypeSort;

  @Output() TSort: EventEmitter<string> = new EventEmitter<string>();
  @Output() InputText: EventEmitter<string> = new EventEmitter<string>();

  typeSort = '';

  inputSearchFilter = '';

  onChangeInput(): void {
    this.InputText.emit(this.inputSearchFilter);
  }

  sortByType(typeSort: string): void {
    this.TSort.emit(typeSort);

    this.typeSort = typeSort;
  }
}
