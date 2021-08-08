import { Component } from '@angular/core';

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

  toggleFilter(filterShow: boolean) {
    this.filterShow = filterShow;
  }

  onSearch(searchText: string) {
    this.searchText = searchText;
  }

  sortByType(typeSort: string) {
    if (typeSort === 'date') {
      this.sortDateUp = !this.sortDateUp;
      if (this.sortDateUp) {
        this.typeSort = 'date-up';
      } else {
        this.typeSort = 'date-down';
      }
    }

    if (typeSort === 'count-views') {
      this.sortCountViewsUp = !this.sortCountViewsUp;
      if (this.sortCountViewsUp) {
        this.typeSort = 'count-views-up';
      } else {
        this.typeSort = 'count-views-down';
      }
    }

    if (typeSort === 'word-or-sentence') {
      this.typeSort = 'word-or-sentence';
    }
  }

  getInputText(inputText: string) {
    this.inputText = inputText;
  }
}
