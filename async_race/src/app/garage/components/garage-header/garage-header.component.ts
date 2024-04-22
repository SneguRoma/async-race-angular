import { Component, EventEmitter, Output } from '@angular/core';
import { CarService } from '../../services/car-service.service';

@Component({
  selector: 'app-garage-header',
  templateUrl: './garage-header.component.html',
  styleUrl: './garage-header.component.scss',
})
export class GarageHeaderComponent {
  @Output() updateParent: EventEmitter<void> = new EventEmitter<void>();
  carName: string = '';
  carColor: string = '';

  constructor(private carService: CarService) {}
  createCar(): void {
    this.carService
      .addCar({ name: this.carName, color: this.carColor })
      .subscribe({
        next: () => {
          this.updateParent.emit();
        },
      });
  }

  updateCar(): void {}
}
