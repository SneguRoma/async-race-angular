import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { CarService } from '../../../services/car-service.service';
import { UpdateCarService } from '../../../services/update-car.service';
import { Subscription, forkJoin } from 'rxjs';
import {
  UNUPDATECAR_ID,
  COUNT_CARS,
  getRandom,
  MINRANDOM,
  MAXNAMES,
  MAXMODELS,
  MAXCOLORS,
  MODELS,
  NAMES,
  COLORS,
  NONUPDATABLE_ID,
} from './constants';

const car = {
  name: '',
  color: '',
};

const updateCar = {
  name: '',
  color: '',
};

@Component({
  selector: 'app-garage-header',
  templateUrl: './garage-header.component.html',
  styleUrl: './garage-header.component.scss',
})
export class GarageHeaderComponent implements OnDestroy {
  @Output() updateParent: EventEmitter<void> = new EventEmitter<void>();
  @Output() startRaceParent: EventEmitter<void> = new EventEmitter<void>();
  @Output() resetRaceParent: EventEmitter<void> = new EventEmitter<void>();
  @Input() totalCars: number | undefined;
  @Input() isRaceEnded: boolean = true;
  carName: string = car.name;
  carColor: string = car.color;
  updateCarName: string = updateCar.name;
  updateCarColor: string = updateCar.color;
  updateCarId: number = UNUPDATECAR_ID;
  updateCarDataSubscription: Subscription;

  constructor(
    private carService: CarService,
    private updateCarService: UpdateCarService,
  ) {
    this.updateCarDataSubscription = this.updateCarService.formsData$.subscribe((data) => {
      this.updateCarName = updateCar.name || data.name;
      this.updateCarColor = updateCar.color || data.color;
      this.updateCarId = data.id;
    });
  }

  createCar(): void {
    this.carService.addCar({ name: this.carName, color: this.carColor }).subscribe({
      next: () => {
        this.updateParent.emit();
      },
    });
  }

  startRace(): void {
    this.startRaceParent.emit();
  }

  resetRace(): void {
    this.resetRaceParent.emit();
  }

  updateCar(): void {
    this.carService
      .updateCar(this.updateCarId, {
        name: this.updateCarName,
        color: this.updateCarColor,
      })
      .subscribe({
        next: () => {
          this.updateCarName = '';
          this.updateCarColor = '';
          this.updateCarId = -1;
          this.updateParent.emit();
        },
      });
  }

  generateCars(): void {
    const addCarObservables = [];
    for (let i = 0; i < COUNT_CARS; i++) {
      const name =
        NAMES[getRandom(MINRANDOM, MAXNAMES)] + '  ' + MODELS[getRandom(MINRANDOM, MAXMODELS)];
      const color =
        '#' +
        COLORS[getRandom(MINRANDOM, MAXCOLORS)] +
        COLORS[getRandom(MINRANDOM, MAXCOLORS)] +
        COLORS[getRandom(MINRANDOM, MAXCOLORS)] +
        COLORS[getRandom(MINRANDOM, MAXCOLORS)] +
        COLORS[getRandom(MINRANDOM, MAXCOLORS)] +
        COLORS[getRandom(MINRANDOM, MAXCOLORS)];
      const addCarObservable = this.carService.addCar({ name: name, color: color });
      addCarObservables.push(addCarObservable);
    }

    forkJoin(addCarObservables).subscribe({
      next: () => {
        this.updateParent.emit();
      },
      error: (error) => {
        console.error('Error adding cars:', error);
      },
    });
  }

  ngOnDestroy(): void {
    this.updateCarDataSubscription.unsubscribe();
    car.color = this.carColor;
    car.name = this.carName;
    updateCar.color = this.updateCarColor;
    updateCar.name = this.updateCarName;
    if (this.updateCarId === NONUPDATABLE_ID)
      this.updateCarService.updateFormData({
        id: NONUPDATABLE_ID,
        name: '',
        color: '',
      });
  }
}
