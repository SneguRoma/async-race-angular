import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ICar, ICarStartStop, ICarWinner, ISuccess } from '../../models/garage.model';
import { CarService } from '../../../services/car-service.service';
import { UpdateCarService } from '../../../services/update-car.service';
import { concatMap } from 'rxjs';
import { WinnerService } from '../../../services/winner-service.service';
import {
  CAR_STEP,
  DIMENSIONS_OF_TIME,
  FINISH_LINE_IN_PIXEL,
  MILISEC_TO_SEC,
  PIXEL_IN_STEP,
  START_POSITION,
} from './constants';

@Component({
  selector: 'app-car-box',
  templateUrl: './car-box.component.html',
  styleUrls: ['./car-box.component.scss'],
})
export class CarBoxComponent implements AfterViewInit {
  @Output() updateParent: EventEmitter<void> = new EventEmitter<void>();
  @Output() winnerRace: EventEmitter<ICarWinner> = new EventEmitter<ICarWinner>();
  @ViewChild('carElement', { read: ElementRef }) carElement!: ElementRef;
  @Input() carItem!: ICar;
  data: ICarStartStop | undefined;
  isCarStarted: boolean = false;
  animationId: number | null = null;
  car: HTMLElement | undefined;
  race: boolean = false;

  constructor(
    private carService: CarService,
    private updateService: UpdateCarService,
    private winnerService: WinnerService,
  ) {}

  ngAfterViewInit(): void {
    this.car = this.carElement.nativeElement;
  }

  startEngine(race: boolean = false): void {
    this.race = race;
    this.carService
      .startEngine(this.carItem.id)
      .pipe(
        concatMap((engineResponse: ICarStartStop) => {
          this.data = engineResponse;
          this.animationCar();
          this.isCarStarted = true;
          return this.carService.startDrive(this.carItem.id);
        }),
      )
      .subscribe({
        next: (driveResponse: ISuccess) => {
          if (!driveResponse.success) {
            this.stopAnimation();
          }
        },
        error: (response: Response) => {
          this.stopAnimation();
          console.error('Error fetching cars:', response.body);
        },
      });
  }

  animationCar(): void {
    const state: { time: number } = { time: 0 };
    let step = CAR_STEP;
    if (this.data?.velocity && this.data.distance) {
      state.time = this.data.distance / this.data.velocity;
    }
    const move = () => {
      const currDist = document.body.clientWidth - FINISH_LINE_IN_PIXEL;
      const pixForSec = currDist / state.time;
      step += pixForSec * PIXEL_IN_STEP;
      if (this.car) this.car.style.left = step + 'px';
      if (step < currDist) this.animationId = window.requestAnimationFrame(move);
      if (step >= currDist && this.race) {
        const timeOfWin = (state.time / MILISEC_TO_SEC).toFixed(DIMENSIONS_OF_TIME);
        const winner: ICarWinner = {
          car: this.carItem,
          time: timeOfWin,
        };
        this.winnerRace.emit(winner);
      }
    };
    this.animationId = window.requestAnimationFrame(move);
  }

  stopAnimation(): void {
    if (this.animationId) {
      window.cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  stopEngine(): void {
    this.carService.stopEngine(this.carItem.id).subscribe({
      next: (data: ICarStartStop) => {
        this.isCarStarted = false;
        this.data = data;
        if (this.car) this.car.style.left = START_POSITION + 'px';
        if (this.animationId) {
          window.cancelAnimationFrame(this.animationId);
          this.animationId = null;
        }
      },
      error: (response: Response) => {
        console.error('Error fetching cars:', response.body);
      },
    });
  }

  deleteCar(): void {
    this.carService.deleteCar(this.carItem.id).subscribe({
      next: () => {
        this.updateParent.emit();
      },
      error: (response: Response) => {
        console.error('Error fetching cars:', response.body);
      },
    });
    this.winnerService.deleteWinner(this.carItem.id).subscribe();
  }

  selectCar(): void {
    this.updateService.updateFormData(this.carItem);
  }
}
