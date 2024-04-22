import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-car-item',  
  templateUrl: './car-item.component.html',
  styleUrl: './car-item.component.scss'
})
export class CarItemComponent {
@Input() color!: string;
}
