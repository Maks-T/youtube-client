import { Component } from '@angular/core';
import { TypeSort } from './shared/models/type-sort.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'youtube-client';

  typeSort: string = '';
  inputText: string = '';
  searchText: string = '';

  public filterShow: boolean = false;
}
