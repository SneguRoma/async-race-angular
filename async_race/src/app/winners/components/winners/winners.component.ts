import { Component, OnInit } from '@angular/core';
import { WinnerService } from '../../../services/winner-service.service';
import { IGetWinners } from '../../models/winner.models';

@Component({
  selector: 'app-winners',  
  templateUrl: './winners.component.html',
  styleUrl: './winners.component.scss'
})
export class WinnersComponent implements OnInit{

  constructor(private winnerService: WinnerService) {}

  ngOnInit(): void {    
    this.winnerService.getWinners().subscribe({
      next: (winners:IGetWinners) => {
        console.log('winners', winners.data, 'count',winners.totalCount)
      },
      error: (error: Error) => {
        console.error('Error fetching cars:', error);
      },
    });
  }
}
