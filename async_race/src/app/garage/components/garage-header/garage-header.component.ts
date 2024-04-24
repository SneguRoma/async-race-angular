import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { CarService } from '../../services/car-service.service';
import { UpdateCarService } from '../../services/update-car.service';
import { Subscription } from 'rxjs';

const UNUPDATECAR_ID = -1;

@Component({
  selector: 'app-garage-header',
  templateUrl: './garage-header.component.html',
  styleUrl: './garage-header.component.scss',
})
export class GarageHeaderComponent implements OnDestroy {
  @Output() updateParent: EventEmitter<void> = new EventEmitter<void>();
  carName: string = '';
  carColor: string = '';
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

  ngOnDestroy(): void {
    this.updateCarDataSubscription.unsubscribe();
  }
}
