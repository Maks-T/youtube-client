import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/sevices/auth.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  filterShow: boolean = false;

  inputSearchText: string = '';

  constructor(
    public searchService: SearchService,
    private router: Router,
    public authService: AuthService,
  ) {}

  clickBtnSearch(): void {
    if (this.authService.isLogin()) {
      this.filterShow = !!this.inputSearchText.trim();
      this.searchService.searchText.next(this.inputSearchText);
      this.router.navigate(['search']);
    } else {
      /* eslint no-alert: "off" */
      alert('You are not logged in!');
    }
  }

  toggleFilter(): void {
    this.filterShow = !this.filterShow;
  }

  clickBtnLogout(): void {
    this.authService.logOut();
    this.router.navigate(['login']);
  }
}
