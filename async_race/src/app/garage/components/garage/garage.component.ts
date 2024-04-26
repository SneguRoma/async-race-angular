import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CarService } from '../../../services/car-service.service';
import { ICar, ICarWinner, IGetCars } from '../../models/garage.model';
import { CarBoxComponent } from '../car-box/car-box.component';
import { WinnerService } from '../../../services/winner-service.service';
import { catchError, switchMap } from 'rxjs';
import { IWin } from '../../../winners/models/winner.models';
import {
  COUNTER,
  DEFAULT_CAR_LIMIT,
  DEFAULT_PAGE,
  DEFAULT_TOTALCOUNT,
} from '../../../constants/constants';

const pagination = {
  page: DEFAULT_PAGE,
  totalPages: DEFAULT_PAGE,
};

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss',
})
export class GarageComponent implements OnInit, OnDestroy {
  @ViewChildren(CarBoxComponent) carBoxComponents!: QueryList<CarBoxComponent>;
  cars: ICar[] = [];
  totalCars: number = DEFAULT_TOTALCOUNT;
  winner: ICar | null = null;
  page: number = pagination.page;
  carsOnPage: number = DEFAULT_CAR_LIMIT;
  totalPages: number = pagination.totalPages;
  showPopup = false;
  winnerTime = '0';
  isRaceEnded: boolean = true;
  constructor(
    private carService: CarService,
    private winnerService: WinnerService,
  ) {}

  ngOnInit(): void {
    this.carService.getCars(this.page, this.carsOnPage).subscribe({
      next: (cars: IGetCars) => {
        this.totalCars = cars.totalCount;
        this.cars = cars.data;
        this.totalPages = Math.ceil(this.totalCars / DEFAULT_CAR_LIMIT);
      },
      error: (error: Error) => {
        console.error('Error fetching cars:', error);
      },
    });
  }

  startRace(): void {
    this.winner = null;
    this.carBoxComponents.forEach((item) => item.startEngine(true));
  }

  resetRace(): void {
    this.carBoxComponents.forEach((item) => item.stopEngine());
    this.isRaceEnded = true;
  }

  winnerRace($event: ICarWinner): void {
    if (!this.winner) {
      this.winner = $event.car;
      this.winnerTime = $event.time;
      this.isRaceEnded = false;
      this.showPopup = true;
      this.winnerService
        .getWinner($event.car.id)
        .pipe(
          switchMap((existingWinner: IWin) => {
            if (existingWinner) {
              const winnerUpdate = {
                wins: existingWinner.wins + COUNTER,
                time: existingWinner.time <= +$event.time ? existingWinner.time : +$event.time,
              };
              return this.winnerService.updateWinner($event.car.id, winnerUpdate);
            } else {
              const winnerUpdate = {
                id: $event.car.id,
                wins: 1,
                time: +$event.time,
              };
              return this.winnerService.addWinner(winnerUpdate);
            }
          }),
          catchError(() => {
            const winnerUpdate = {
              id: $event.car.id,
              wins: 1,
              time: +$event.time,
            };
            return this.winnerService.addWinner(winnerUpdate);
          }),
        )
        .subscribe();
    }
  }

  closePopup(): void {
    this.showPopup = false;
  }

  pageChange(page: number): void {
    this.page = page;
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    pagination.page = this.page;
    pagination.totalPages = this.totalPages;
  }
}
