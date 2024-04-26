import { Component } from '@angular/core';
import { WinnersSorterService } from '../../../services/winners-sorter.service';
import { IWinSort, SortField } from '../../models/winner.models';

@Component({
  selector: 'app-winners-table-header',
  templateUrl: './winners-table-header.component.html',
  styleUrl: './winners-table-header.component.scss',
})
export class WinnersTableHeaderComponent {
  sortingData: IWinSort = {
    field: 'id',
    order: 'ASC',
  };

  constructor(private winnersSorterService: WinnersSorterService) {}

  changeSortField(field: SortField): void {
    this.sortingData.field = field;
    if (this.sortingData.order === 'ASC') {
      this.sortingData.order = 'DESC';
    } else this.sortingData.order = 'ASC';
    this.winnersSorterService.sortData(this.sortingData);
  }
}
