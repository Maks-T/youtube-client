import { Component } from '@angular/core';
import { ETypeSort } from './components/search-filter/type-sort.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'youtube-client';

  sortDateUp = false;
  sortCountViewsUp = false;

  typeSort: string = '';
  inputText: string = '';
  searchText: string = '';

  public filterShow: boolean = false;

  toggleFilter(filterShow: boolean): void {
    this.filterShow = filterShow;
  }

  onSearch(searchText: string): void {
    this.searchText = searchText;
  }

  sortByType(typeSort: string): void {
    if (typeSort === ETypeSort.date) {
      this.sortDateUp = !this.sortDateUp;
      if (this.sortDateUp) {
        this.typeSort = ETypeSort.dateUp;
      } else {
        this.typeSort = ETypeSort.dateDown;
      }
    }

    if (typeSort === ETypeSort.countViews) {
      this.sortCountViewsUp = !this.sortCountViewsUp;
      if (this.sortCountViewsUp) {
        this.typeSort = ETypeSort.countViewsUp;
      } else {
        this.typeSort = ETypeSort.countViewsDown;
      }
    }

    if (typeSort === ETypeSort.wordOrSentence) {
      this.typeSort = ETypeSort.wordOrSentence;
    }
  }

  getInputText(inputText: string): void {
    this.inputText = inputText;
  }
}
