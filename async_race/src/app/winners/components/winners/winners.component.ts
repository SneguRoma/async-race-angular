import { Component, OnDestroy } from '@angular/core';
import { WinnerService } from '../../../services/winner-service.service';
import { IGetWinners, IWin, IWinSort } from '../../models/winner.models';
import {
  DEFAULT_PAGE,
  DEFAULT_TOTALCOUNT,
  DEFAULT_WINNERS_LIMIT,
} from '../../../constants/constants';
import { WinnersSorterService } from '../../../services/winners-sorter.service';
import { Subscription } from 'rxjs';

const pagination = {
  page: DEFAULT_PAGE,
  totalPages: DEFAULT_PAGE,
};

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrl: './winners.component.scss',
})
export class WinnersComponent implements OnDestroy {
  sortedData: IWinSort = {
    field: 'id',
    order: 'ASC',
  };
  winners: IWin[] = [];
  totalCount: number = DEFAULT_TOTALCOUNT;
  page: number = pagination.page;
  totalPages: number = pagination.totalPages;
  winnerSorterDataSubscription: Subscription;

  constructor(
    private winnerService: WinnerService,
    private winnerSorterService: WinnersSorterService,
  ) {
    this.winnerSorterDataSubscription = this.winnerSorterService.sortsData$.subscribe((data) => {
      this.sortedData = data;
      this.handleSortDataChange();
    });
  }

  handleSortDataChange(): void {
    this.winnerService
      .getWinners(this.page, DEFAULT_WINNERS_LIMIT, this.sortedData.field, this.sortedData.order)
      .subscribe({
        next: (winners: IGetWinners) => {
          this.totalCount = winners.totalCount;
          this.winners = winners.data;
          this.totalPages = Math.ceil(this.totalCount / DEFAULT_WINNERS_LIMIT);
        },
        error: (error: Error) => {
          console.error('Error fetching cars:', error);
        },
      });
  }

  pageChange(page: number): void {
    this.page = page;
    this.handleSortDataChange();
  }

  ngOnDestroy(): void {
    this.winnerSorterDataSubscription.unsubscribe();
    pagination.page = this.page;
    pagination.totalPages = this.totalPages;
  }
}
