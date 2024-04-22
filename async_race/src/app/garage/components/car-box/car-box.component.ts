import { Component, Input } from '@angular/core';
import {
  trigger,
  transition,
  animate,
  style,
  state,
} from '@angular/animations';

/* const enterTransition = transition(':enter',[style({
  transform: 'translateX(0)' 
}), animate('1s ease-in', style({
  //margin: '100px',
  transform: 'translateX(100%)' 
}))]); */
//const moveCar = trigger('moveCar', [enterTransition])

@Component({
  selector: 'app-car-box',
  templateUrl: './car-box.component.html',
  styleUrl: './car-box.component.scss',
  animations: [
    trigger('moveCar', [
      state(
        'start',
        style({
          transform: 'translateX(0)',
        })
      ),
      state(
        'end',
        style({
          transform: 'translateX(85vw)',
        })
      ),
      transition('start => end', animate('3s ease-in-out')),
    ]),
  ],
})
export class CarBoxComponent {
  @Input()
  name!: string;
  animationState: string = 'start';

  triggerAnimation(): void {
    this.animationState = 'end';
  }
  stopAnimation(): void {
    this.animationState = 'start';
  }
}
