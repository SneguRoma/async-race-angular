import { Component, Input, OnInit } from '@angular/core';
import { IWin } from '../../models/winner.models';
import { CarService } from '../../../services/car-service.service';
import { WinnerService } from '../../../services/winner-service.service';
import { ICar, INewCar } from '../../../garage/models/garage.model';
import { DEFAULT_TOTALCOUNT } from '../../../constants/constants';

@Component({
  selector: 'app-winners-table-row',
  templateUrl: './winners-table-row.component.html',
  styleUrl: './winners-table-row.component.scss',
})
export class WinnersTableRowComponent implements OnInit {
  @Input() winner!: IWin;
  car: INewCar = {
    color: '',
    name: '',
  };
  totalCount: number = DEFAULT_TOTALCOUNT;

  constructor(
    private carService: CarService,
    private winnerService: WinnerService,
  ) {}

  ngOnInit(): void {
    this.carService.getCar(this.winner.id).subscribe({
      next: (car: ICar) => {
        this.car = car;
      },
    });
  }
}
