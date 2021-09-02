import { Pipe, PipeTransform } from '@angular/core';
import { TypeSort } from '../../shared/models/type-sort.model';
import { ICustomItem } from '../models/custom-item.model';
import { IItem } from '../models/search-item.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    value: (IItem | ICustomItem)[] | null,
    sortType: string = '',
    inputText: string = '',
  ): (IItem | ICustomItem)[] | [] {
    if (!value) return [];

    switch (sortType) {
      case TypeSort.wordOrSentence:
        if (!inputText.trim()) return value;

        return value.filter((item) => item.snippet.title.toLowerCase().includes(inputText.toLowerCase()));
      case TypeSort.dateUp:
        return value.sort(
          (a, b) => Number(new Date(b.snippet.publishedAt))
            - Number(new Date(a.snippet.publishedAt)),
        );

      case TypeSort.dateDown:
        return value.sort(
          (a, b) => Number(new Date(a.snippet.publishedAt))
            - Number(new Date(b.snippet.publishedAt)),
        );

      case TypeSort.countViewsUp:
        return value.sort(
          (a, b) => Number(b.statistics.viewCount) - Number(a.statistics.viewCount),
        );
      case TypeSort.countViewsDown:
        return value.sort(
          (a, b) => Number(a.statistics.viewCount) - Number(b.statistics.viewCount),
        );

      default: {
        return value;
      }
    }
  }
}
