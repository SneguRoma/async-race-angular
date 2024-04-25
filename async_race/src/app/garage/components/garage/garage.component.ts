import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CarService } from '../../../services/car-service.service';
import { ICar } from '../../models/garage.model';
import { CarBoxComponent } from '../car-box/car-box.component';

const PAGE = 1;
const CARS_ON_PAGE = 7;

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss',
})
export class GarageComponent implements OnInit {
  @ViewChildren(CarBoxComponent) carBoxComponents!: QueryList<CarBoxComponent>;
  cars: ICar[] = [];
  totalCars: ICar[] = [];
  page: number = PAGE;
  carsOnPage: number = CARS_ON_PAGE;
  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.carService.getAllCars().subscribe({
      next: (cars: ICar[]) => {
        this.totalCars = cars;
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
    this.carBoxComponents.forEach((item) => item.startEngine());
  }

  resetRace(): void {
    this.carBoxComponents.forEach((item) => item.stopEngine());
  }
}
