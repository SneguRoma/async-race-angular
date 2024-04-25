import { Component, Input } from '@angular/core';
import { DEFAULT_TOTALCOUNT } from '../../../constants/constants';



@Component({
  selector: 'app-winners-header',  
  templateUrl: './winners-header.component.html',
  styleUrl: './winners-header.component.scss'
})

export class WinnersHeaderComponent {
  @Input() totalCount: number = DEFAULT_TOTALCOUNT;

}
