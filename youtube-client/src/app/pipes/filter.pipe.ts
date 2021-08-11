import { Pipe, PipeTransform } from '@angular/core';
import { TypeSort } from '../components/search-filter/type-sort.model';
import { IItem } from '../components/search/search-item.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    value: IItem[],
    sortType: string = '',
    inputText: string = ''
  ): IItem[] {
    if (sortType !== TypeSort.wordOrSentence) return value;
    if (!inputText.trim()) return value;

    return value.filter((item) => {
      return item.snippet.tags?.filter((tag) => {
        return tag.toLowerCase().includes(inputText.toLowerCase());
      }).length;
    });
  }
}
