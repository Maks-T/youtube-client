import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Subject } from 'rxjs';
import {
  debounceTime, filter, map, takeUntil,
} from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  filterShow: boolean = false;

  inputSearchText: string = '';

  destroyed$ = new Subject<boolean>();

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
        takeUntil(this.destroyed$),
      )
      .subscribe((searchText: string) => {
        this.searchService.searchText$.next(searchText);
      });

    this.searchService.searchText$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((searchText) => {
        this.inputSearchText = searchText;
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
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
