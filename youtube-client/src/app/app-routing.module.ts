import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('src/app/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('src/app/youtube/youtube.module').then((m) => m.YoutubeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
