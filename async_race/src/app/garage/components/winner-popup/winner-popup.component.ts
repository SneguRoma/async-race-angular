import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-winner-popup',
  templateUrl: './winner-popup.component.html',
  styleUrl: './winner-popup.component.scss',
})
export class WinnerPopupComponent {
  @Input() carName: string = '';
  @Input() timeOfWin: string = '';
  @Output() closePop = new EventEmitter<void>();

  closePopup(): void {
    this.closePop.emit();
  }
}
