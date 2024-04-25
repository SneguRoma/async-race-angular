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
  winnerSorterDataSubscription: Subscription;

  constructor(
    private winnerService: WinnerService,
    private winnerSorterService: WinnersSorterService
  ) {
    this.winnerSorterDataSubscription =
      this.winnerSorterService.sortsData$.subscribe((data) => {
        this.sortedData = data;
        this.handleSortDataChange();
      });
  }

  handleSortDataChange(): void {
    console.log('sort');
    this.winnerService
      .getWinners(
        DEFAULT_PAGE,
        DEFAULT_WINNERS_LIMIT,
        this.sortedData.field,
        this.sortedData.order
      )
      .subscribe({
        next: (winners: IGetWinners) => {
          this.totalCount = winners.totalCount;
          this.winners = winners.data;
        },
        error: (error: Error) => {
          console.error('Error fetching cars:', error);
        },
      });
  }

  ngOnDestroy(): void {
    this.winnerSorterDataSubscription.unsubscribe();
  }
}
