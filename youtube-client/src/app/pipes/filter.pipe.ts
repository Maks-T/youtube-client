import { Pipe, PipeTransform } from '@angular/core';
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
    if (sortType !== 'word-or-sentence') return value;
    if (!inputText.trim()) return value;
    console.log('filter-pipe', sortType, inputText);

    return value.filter((item) => {
      return item.snippet.tags?.filter((tag) => {
        return tag.toLowerCase().includes(inputText.toLowerCase());
      }).length;
    });
  }
}
