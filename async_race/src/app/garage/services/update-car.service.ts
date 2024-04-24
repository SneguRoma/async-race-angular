import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICar } from '../models/garage.model';

@Injectable({
  providedIn: 'root',
})
export class UpdateCarService {
  private formDataSubject: BehaviorSubject<ICar> =
    new BehaviorSubject<ICar>({ id: -1 ,name: '', color: '' });
  formsData$: Observable<ICar> = this.formDataSubject.asObservable();

  constructor(){}

  updateFormData(data: ICar): void {
    this.formDataSubject.next(data);
  }
}
