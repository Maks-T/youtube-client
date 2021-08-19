import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { mockResponse } from 'src/app/app.constants';
import { SearchService } from 'src/app/core/services/search.service';
import { IItem } from '../../models/search-item.model';
import { IResponse } from '../../models/search-response.model';

@Component({
  selector: 'app-detailed-info',
  templateUrl: './detailed-info.component.html',
  styleUrls: ['./detailed-info.component.scss'],
})
export class DetailedInfoComponent implements OnInit, OnDestroy {
  item!: IItem;

  itemId!: string;

  response$!: Observable<IResponse>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('itemId') as string;
    this.response$ = this.searchService.fetchDetailedInfo(this.itemId);

    this.response$.subscribe((responseData) => {
      this.item = responseData.items[0];
    });

    /*mockResponse.items.find((item) => item.id === this.itemId)
      || mockResponse.items[0];*/
  }

  ngOnDestroy() {
    this.response$;
  }

  public onGoBack() {
    this.router.navigate(['search']);
  }
}
