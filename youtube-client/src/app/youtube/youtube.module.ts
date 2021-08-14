import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomColorDirective } from './directives/bottom-color.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { SearchItemComponent } from './components/search/search-item/search-item.component';
import { SearchResultsComponent } from './components/search/search-results/search-results.component';
import { ShortTitlePipe } from './pipes/short-title.pipe';

@NgModule({
  declarations: [
    SearchResultsComponent,
    SearchItemComponent,
    ShortTitlePipe,
    BottomColorDirective,
    FilterPipe,
  ],
  imports: [CommonModule],
  exports: [
    SearchResultsComponent,
    SearchItemComponent,
    ShortTitlePipe,
    BottomColorDirective,
    FilterPipe,
  ],
})
export class YoutubeModule {}
