import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CarService } from '../../../services/car-service.service';
import { ICar, ICarWinner } from '../../models/garage.model';
import { CarBoxComponent } from '../car-box/car-box.component';
import { WinnerService } from '../../../services/winner-service.service';
import { catchError, switchMap } from 'rxjs';
import { IWin } from '../../../winners/models/winner.models';
import { COUNTER } from '../../../constants/constants';

const PAGE = 1;
const CARS_ON_PAGE = 7;
const pagination = {
  page: PAGE,
  totalPages: PAGE
};


@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss',
})
export class GarageComponent implements OnInit, OnDestroy {
  @ViewChildren(CarBoxComponent) carBoxComponents!: QueryList<CarBoxComponent>;
  cars: ICar[] = [];
  totalCars: ICar[] = [];
  winner: ICar | null = null;
  page: number = pagination.page;
  carsOnPage: number = CARS_ON_PAGE;
  totalPages: number = pagination.totalPages;
  showPopup = false;
  winnerTime = '0';
  constructor(
    private carService: CarService,
    private winnerService: WinnerService
  ) {}

  ngOnInit(): void {
   
    this.carService.getAllCars().subscribe({
      next: (cars: ICar[]) => {
        this.totalCars = cars;
        this.totalPages = Math.ceil(this.totalCars.length / this.carsOnPage);        
      },
      error: (error: Error) => {
        console.error('Error fetching cars:', error);
      },
    });
    this.carService.getCars(this.page, this.carsOnPage).subscribe({
      next: (cars: ICar[]) => {
        this.cars = cars;
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
    this.winner = null;
  }

  winnerRace($event: ICarWinner): void {
    if (!this.winner) {
      this.winner = $event.car;
      this.winnerTime = $event.time;
      this.showPopup = true;
      this.winnerService
        .getWinner($event.car.id)
        .pipe(
          switchMap((existingWinner: IWin) => {
            if (existingWinner) {
              const winnerUpdate = {
                wins: existingWinner.wins + COUNTER,
                time:existingWinner.time <= +$event.time
                    ? existingWinner.time
                    : +$event.time,
              };
              return this.winnerService.updateWinner(
                $event.car.id,
                winnerUpdate
              );
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
          })
        ).subscribe();
    }
  }

  closePopup(): void {
    this.showPopup = false;
  }

  pageChange(page: number): void{
    this.page = page;
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    pagination.page = this.page;
    pagination.totalPages = this.totalPages;
  }
}
