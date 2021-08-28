import { Pipe, PipeTransform } from '@angular/core';
import { ICustomItem } from 'src/app/redux/models/custom-item.model';
import { TypeSort } from '../../shared/models/type-sort.model';
import { IItem } from '../models/search-item.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    value: (IItem | ICustomItem)[] | null,
    sortType: string = '',
    inputText: string = ''
  ): (IItem | ICustomItem)[] | [] {
    if (!value) return [];
    if (sortType !== TypeSort.wordOrSentence) return value;
    if (!inputText.trim()) return value;

    return value.filter((item) =>
      item.snippet.title.toLowerCase().includes(inputText.toLowerCase())
    );
  }
}
