import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { ICar, ICarStartStop, ISuccess } from '../../models/garage.model';
import { CarService } from '../../../services/car-service.service';
import { UpdateCarService } from '../../../services/update-car.service';
import { concatMap } from 'rxjs';

const finishLineInPixel = 100;
const pixelInStep = 30;
const startPosition = 15;
const stepCar = 15;

@Component({
  selector: 'app-car-box',
  templateUrl: './car-box.component.html',
  styleUrls: ['./car-box.component.scss'],
})
export class CarBoxComponent implements AfterViewInit, OnDestroy {
  @Output() updateParent: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('carElement', { read: ElementRef }) carElement!: ElementRef;
  @Input() carItem!: ICar;
  data: ICarStartStop | undefined;
  isCarStarted: boolean = false;
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
    this.carService
      .startEngine(this.carItem.id)
      .pipe(
        concatMap((engineResponse: ICarStartStop) => {
          this.data = engineResponse;
          this.animationCar();
          this.isCarStarted=true;
          return this.carService.startDrive(this.carItem.id);
        })
      )
      .subscribe({
        next: (driveResponse: ISuccess) => {
          if (!driveResponse.success) {
            this.stopAnimation();
          }
        },
        error: (response: Response) => {
          this.stopAnimation();
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
      
      window.cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  stopEngine(): void {
    this.carService.stopEngine(this.carItem.id).subscribe({
      next: (data: ICarStartStop) => {
        this.isCarStarted=false;
        this.data = data;
        if (this.car) this.car.style.left = startPosition + 'px';
        if (this.animationId) {
          window.cancelAnimationFrame(this.animationId);
          this.animationId = null;
        }        
      },
      error: (response: Response) => {
        console.log('Error fetching cars:', response.body);
      },
    });
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

  someMethodInCarBox(): void {
    console.log(`Method in ${this.carItem.name} car-box executed!`);
  }

  ngOnDestroy(): void {
    this.updateService.updateFormData({id: -1, name:'', color:''});
  }
}
