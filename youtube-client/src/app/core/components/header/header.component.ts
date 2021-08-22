import {
  Component, ElementRef, OnInit, ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  filterShow: boolean = false;

  inputSearchText: string = '';

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  constructor(
    public searchService: SearchService,
    private router: Router,
    public authService: AuthService,
  ) {}

  ngOnInit() {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        filter((res) => res.length > 2),
        debounceTime(1000),
      )
      .subscribe((searchText: string) => {
        this.searchService.searchText$.next(searchText);
      });

    this.searchService.searchText$.subscribe((searchText) => {
      this.inputSearchText = searchText;
    });
  }

  clickBtnSearch(): void {
    if (this.authService.isLogin) {
      this.filterShow = !!this.inputSearchText.trim();
      this.searchService.searchText$.next(this.inputSearchText);
      this.router.navigate(['search']);
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
