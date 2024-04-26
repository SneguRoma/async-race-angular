import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { CarService } from '../../../services/car-service.service';
import { UpdateCarService } from '../../../services/update-car.service';
import { Subscription } from 'rxjs';
import {
  UNUPDATECAR_ID,
  COUT_CARS,
  getRandom,
  MINRANDOM,
  MAXNAMES,
  MAXMODELS,
  MAXCOLORS,
  MODELS,
  NAMES,
  COLORS,
} from './constants';

const car = {
  name: '',
  color:''
}

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
  carName: string = car.name;
  carColor: string = car.color;
  updateCarName: string = '';
  updateCarColor: string = '';
  updateCarId: number = UNUPDATECAR_ID;
  updateCarDataSubscription: Subscription;

  constructor(
    private carService: CarService,
    private updateCarService: UpdateCarService
  ) {
    this.updateCarDataSubscription = this.updateCarService.formsData$.subscribe(
      (data) => {
        this.updateCarName = data.name;
        this.updateCarColor = data.color;
        this.updateCarId = data.id;
      }
    );
  }

  createCar(): void {
    this.carService
      .addCar({ name: this.carName, color: this.carColor })
      .subscribe({
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
    for (let i = 0; i < COUT_CARS; i++) {
      const name =
        NAMES[getRandom(MINRANDOM, MAXNAMES)] +
        '  ' +
        MODELS[getRandom(MINRANDOM, MAXMODELS)];
      const color =
        '#' +
        COLORS[getRandom(MINRANDOM, MAXCOLORS)] +
        COLORS[getRandom(MINRANDOM, MAXCOLORS)] +
        COLORS[getRandom(MINRANDOM, MAXCOLORS)] +
        COLORS[getRandom(MINRANDOM, MAXCOLORS)] +
        COLORS[getRandom(MINRANDOM, MAXCOLORS)] +
        COLORS[getRandom(MINRANDOM, MAXCOLORS)];
      this.carService.addCar({ name: name, color: color }).subscribe();
    }
    this.updateParent.emit();
  }

  ngOnDestroy(): void {
    this.updateCarDataSubscription.unsubscribe();
    car.color = this.carColor;
    car.name = this.carName;
  }
}
