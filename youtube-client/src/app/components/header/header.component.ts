import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  filterShow: boolean = false;
  inputSearchText: string = '';

  @Output() ToggleFilter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() Search: EventEmitter<string> = new EventEmitter<string>();

  clickBtnSearch(): void {
    this.filterShow = !!this.inputSearchText.trim();

    this.ToggleFilter.emit(this.filterShow);

    this.Search.emit(this.inputSearchText.trim());
  }

  toggleFilter(): void {
    this.filterShow = !this.filterShow;

    this.ToggleFilter.emit(this.filterShow);
  }
}
