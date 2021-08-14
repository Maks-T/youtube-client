import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HeaderComponent, SearchFilterComponent],
  imports: [CommonModule, SharedModule],
  exports: [HeaderComponent, SearchFilterComponent],
})
export class CoreModule {}
