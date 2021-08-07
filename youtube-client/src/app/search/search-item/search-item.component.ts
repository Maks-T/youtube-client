import { Component, Input, OnInit } from '@angular/core';
import { IItem } from '../search-item.model';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent {
  @Input() item!: IItem;

  constructor() {}

  getColor() {
    const timeDifference: number =
      Number(new Date()) - Number(new Date(this.item.snippet.publishedAt));

    const dayDifference = timeDifference / 86400000;
    console.log('dayDifference ', dayDifference);
    if (dayDifference < 7) {
      return 'blue';
    } else if (dayDifference < 30) {
      return 'green';
    } else if (dayDifference < 182) {
      return 'yellow';
    } else {
      return 'red';
    }
  }
}
