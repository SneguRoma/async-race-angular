import { Component, Input } from '@angular/core';
import { IWin } from '../../models/winner.models';
import { CarService } from '../../../services/car-service.service';
import { WinnerService } from '../../../services/winner-service.service';

@Component({
  selector: 'app-winners-table-row',  
  templateUrl: './winners-table-row.component.html',
  styleUrl: './winners-table-row.component.scss'
})
export class WinnersTableRowComponent {
@Input() winner!: IWin;
carColor: string = '';
carName: string = '';
carTime: number = 0;
carWins: number = 0;

constructor(
  private carService: CarService,
  private winnerService: WinnerService
) {} 

}
