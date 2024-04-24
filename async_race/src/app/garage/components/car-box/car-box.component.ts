import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ICar, ICarStartStop, ISuccess } from '../../models/garage.model';
import { CarService } from '../../services/car-service.service';
import { UpdateCarService } from '../../services/update-car.service';

const finishLineInPixel = 100;
const pixelInStep = 30;
const startPosition = 15;
const stepCar = 15;

@Component({
  selector: 'app-car-box',
  templateUrl: './car-box.component.html',
  styleUrls: ['./car-box.component.scss'],
})
export class CarBoxComponent implements AfterViewInit {
  @Output() updateParent: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('carElement', { read: ElementRef }) carElement!: ElementRef;
  @Input() carItem!: ICar;
  data: ICarStartStop | undefined;

  animationId: number | null = null;
  car: HTMLElement | undefined;
  constructor(
    private carService: CarService,
    private updateService: UpdateCarService
  ) {}

  ngAfterViewInit(): void {
    this.car = this.carElement.nativeElement;
  }

  async startEngine(): Promise<void> {
    this.carService.startEngine(this.carItem.id).subscribe({
      next: (data: ICarStartStop) => {
        this.data = data;
        console.log(this.data);
        this.animationCar();
        this.carService.startDrive(this.carItem.id).subscribe({
          next: (data: ISuccess) => {
            console.log(data.success);
            if (!data.success) {
              this.stopAnimation();
            }
          },
          error: (response: Response) => {
            console.log('Error fetching cars:', response.body);
          },
        });
      },
      error: (response: Response) => {
        console.log('Error fetching cars:', response.body);
      },
    });
  }

  animationCar(): void {
    const state: { time: number } = { time: 0 };
    let step = stepCar;
    if (this.data?.velocity && this.data.distance) {
      state.time = this.data.distance / this.data.velocity;
    }
    const move = () => {
      const currDist = document.body.clientWidth - finishLineInPixel;
      const pixForSec = currDist / state.time;
      step += pixForSec * pixelInStep;
      if (this.car) this.car.style.left = step + 'px';
      if (step < currDist)
        this.animationId = window.requestAnimationFrame(move);
    };
    this.animationId = window.requestAnimationFrame(move);
  }

  stopAnimation(): void {
    if (this.animationId) {
      console.log('stop2', this.animationId);
      window.cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  stopEngine(): void {
    this.carService.stopEngine(this.carItem.id).subscribe({
      next: (data: ICarStartStop) => {
        this.data = data;
      },
      error: (response: Response) => {
        console.log('Error fetching cars:', response.body);
      },
    });
    if (this.animationId) {
      window.cancelAnimationFrame(this.animationId);
      this.animationId = null;
      if (this.car) this.car.style.left = startPosition + 'px';
    }
  }

  deleteCar(): void {
    this.carService.deleteCar(this.carItem.id).subscribe({
      next: () => {
        this.updateParent.emit();
      },
      error: (response: Response) => {
        console.log('Error fetching cars:', response.body);
      },
    });
  }

  selectCar(): void {
    this.updateService.updateFormData(this.carItem);
  }
}
