import { Component, Input } from '@angular/core';
import { IItem } from 'src/app/youtube/models/search-item.model';

const countMillisecondInDay = 86400000;
const Month = 30;
const Week = 7;
const Medium = 182;

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent {
  @Input() item!: IItem;

  getColor(): string {
    const timeDifference: number =
      Number(new Date()) - Number(new Date(this.item.snippet.publishedAt));

    const dayDifference = timeDifference / countMillisecondInDay;

    if (dayDifference < Week) {
      return 'blue';
    } else if (dayDifference < Month) {
      return 'green';
    } else if (dayDifference < Medium) {
      return 'yellow';
    } else {
      return 'red';
    }
  }
}
