import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  filterShow: boolean = false;
  inputSearchText: string = '';

  constructor(public searchService: SearchService, private router: Router) {}

  clickBtnSearch(): void {
    this.filterShow = !!this.inputSearchText.trim();
    this.searchService.searchText.next(this.inputSearchText);
    this.router.navigate(['search']);
  }

  toggleFilter(): void {
    console.log('this.filterShow', this.filterShow);
    this.filterShow = !this.filterShow;
  }
}
