import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BottomColorDirective } from './directives/bottom-color.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { SearchItemComponent } from './components/search/search-item/search-item.component';
import { SearchResultsComponent } from './components/search/search-results/search-results.component';
import { ShortTitlePipe } from './pipes/short-title.pipe';
import { DetailedInfoComponent } from './components/detailed-info/detailed-info.component';
import { AuthGuard } from '../core/quards/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [
    SearchResultsComponent,
    SearchItemComponent,
    ShortTitlePipe,
    BottomColorDirective,
    FilterPipe,
    DetailedInfoComponent,
    AdminComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: SearchResultsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':itemId',
        component: DetailedInfoComponent,
        canActivate: [AuthGuard],
      },
    ]),
  ],
  exports: [
    SearchResultsComponent,
    SearchItemComponent,
    AdminComponent,
    ShortTitlePipe,
    BottomColorDirective,
    FilterPipe,
  ],
})
export class YoutubeModule {}
