import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SearchService } from 'src/app/core/services/search.service';
import { IItem } from '../../models/search-item.model';
import { IResponse } from '../../models/search-response.model';

@Component({
  selector: 'app-detailed-info',
  templateUrl: './detailed-info.component.html',
  styleUrls: ['./detailed-info.component.scss'],
})
export class DetailedInfoComponent implements OnInit {
  item!: IItem;

  itemId!: string;

  response$!: Observable<IResponse>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public searchService: SearchService,
  ) {}

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('itemId') as string;
    this.response$ = this.searchService.fetchDetailedInfo(this.itemId);

    this.response$.subscribe((responseData) => {
      [this.item] = responseData.items;
    });
  }

  public onGoBack() {
    this.router.navigate(['search']);
  }
}
