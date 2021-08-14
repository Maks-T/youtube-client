import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  filterShow: boolean = false;
  inputSearchText: string = '';

  constructor(public searchService: SearchService) {}

  clickBtnSearch(): void {
    this.filterShow = !!this.inputSearchText.trim();
    this.searchService.searchText.next(this.inputSearchText);
  }

  toggleFilter(): void {
    console.log('this.filterShow', this.filterShow);
    this.filterShow = !this.filterShow;
  }

  cli(): void {}
}
