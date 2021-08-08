import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  filterShow: boolean = false;
  inputSearchText: string = '';

  @Output() onToggleFilter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  onClickBtnSearch() {
    if (this.inputSearchText.trim()) {
      this.filterShow = true;
    } else {
      this.filterShow = false;
    }
    this.onToggleFilter.emit(this.filterShow);

    this.onSearch.emit(this.inputSearchText.trim());
  }

  toggleFilter() {
    this.filterShow = !this.filterShow;

    this.onToggleFilter.emit(this.filterShow);
  }
}
