import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  filterShow: boolean = false;
  @Output() onToggleFilter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  toggleFilter() {
    this.filterShow = !this.filterShow;

    this.onToggleFilter.emit(this.filterShow);
  }
}
