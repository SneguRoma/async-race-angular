import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

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
  @ViewChild('carElement', { read: ElementRef }) carElement!: ElementRef;
  @Input() name!: string;
  animationId: number | null = null;
  car:HTMLElement | undefined;
  constructor() {}

  ngAfterViewInit(): void {
   this.car =this.carElement.nativeElement;
  }

  animationCar(/* id:number,velo: number, dist: number, carName?: string */): void {
    const state: { id: number; time: number } = { id: 0, time: 0 };

    let step = stepCar;
    //const el = this.carElement.nativeElement as HTMLElement;
    const dist = 500000;
    const velo = 64;
    state.time = dist / velo;
    const move = () => {
      const currDist = document.body.clientWidth - finishLineInPixel;

      const timeForDist = dist / velo;
      const pixForSec = currDist / timeForDist;
      step += pixForSec * pixelInStep;
      if(this.car) this.car.style.left = step + 'px';
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

  stopEngine(): void{
    if (this.animationId) {
     
      window.cancelAnimationFrame(this.animationId);
      this.animationId = null;
      if(this.car) this.car.style.left = startPosition + 'px'  
    }
    
    
  }
}
