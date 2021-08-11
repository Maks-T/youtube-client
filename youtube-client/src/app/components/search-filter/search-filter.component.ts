import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent {
  @Output() TypeSort: EventEmitter<string> = new EventEmitter<string>();
  @Output() InputText: EventEmitter<string> = new EventEmitter<string>();

  typeSort = '';

  inputSearchFilter = '';

  onChangeInput(): void {
    this.InputText.emit(this.inputSearchFilter);
  }

  sortByType(typeSort: string): void {
    this.TypeSort.emit(typeSort);

    this.typeSort = typeSort;
  }
}
