import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IWinSort } from '../winners/models/winner.models';

@Injectable({
  providedIn: 'root',
})
export class WinnersSorterService {
  private formDataSubject: BehaviorSubject<IWinSort> =
    new BehaviorSubject<IWinSort>({ field: 'wins', order: 'ASC' });
  sortsData$: Observable<IWinSort> = this.formDataSubject.asObservable();

  constructor(){}

  sortData(data: IWinSort): void {
    this.formDataSubject.next(data);
  }
}
