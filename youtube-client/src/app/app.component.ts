import { Component } from '@angular/core';
import { TypeSort } from './components/search-filter/type-sort.model';

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
    if (typeSort === TypeSort.date) {
      this.sortDateUp = !this.sortDateUp;
      if (this.sortDateUp) {
        this.typeSort = TypeSort.dateUp;
      } else {
        this.typeSort = TypeSort.dateDown;
      }
    }

    if (typeSort === TypeSort.countViews) {
      this.sortCountViewsUp = !this.sortCountViewsUp;
      if (this.sortCountViewsUp) {
        this.typeSort = TypeSort.countViewsUp;
      } else {
        this.typeSort = TypeSort.countViewsDown;
      }
    }

    if (typeSort === TypeSort.wordOrSentence) {
      this.typeSort = TypeSort.wordOrSentence;
    }
  }

  getInputText(inputText: string): void {
    this.inputText = inputText;
  }
}
