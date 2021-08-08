import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent implements OnInit {
  @Output() onTypeSort: EventEmitter<string> = new EventEmitter<string>();
  @Output() onInputText: EventEmitter<string> = new EventEmitter<string>();

  typeSort = '';

  inputSearchFilter = '';

  constructor() {}

  ngOnInit(): void {}

  onChangeInput() {
    this.onInputText.emit(this.inputSearchFilter);
  }

  sortByType(typeSort: string) {
    this.onTypeSort.emit(typeSort);

    this.typeSort = typeSort;
  }
}
