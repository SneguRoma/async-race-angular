import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICar, ICarStartStop, INewCar, ISuccess } from '../models/garage.model';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 7;

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrlGarage = 'http://127.0.0.1:3000/garage';
  private apiUrlEngine = 'http://127.0.0.1:3000/engine';

  constructor(private http: HttpClient) {}

  getCars(
    page: number = DEFAULT_PAGE,
    limit: number = DEFAULT_LIMIT
  ): Observable<ICar[]> {
    const url = `${this.apiUrlGarage}?_page=${page}&_limit=${limit}`;
    return this.http.get<ICar[]>(url);
  }

  getAllCars(): Observable<ICar[]> {
    const url = `${this.apiUrlGarage}`;
    return this.http.get<ICar[]>(url);
  }

  getCar(id: number): Observable<ICar> {
    return this.http.get<ICar>(`${this.apiUrlGarage}/${id}`);
  }

  addCar(car: INewCar): Observable<ICar> {    
    return this.http.post<ICar>(this.apiUrlGarage, car);
  }

 

  updateCar(id: number, car: INewCar): Observable<ICar> {
    return this.http.put<ICar>(`${this.apiUrlGarage}/${id}`, car);
  }

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlGarage}/${id}`);
  }

  startEngine(id: number): Observable<ICarStartStop> {
    return this.http.patch<ICarStartStop>(
      `${this.apiUrlEngine}?id=${id}&status=started`,
      {}
    );
  }

  stopEngine(id: number): Observable<ICarStartStop> {
    return this.http.patch<ICarStartStop>(
      `${this.apiUrlEngine}?id=${id}&status=stopped`,
      {}
    );
  }

  startDrive(id: number): Observable<ISuccess> {
    return this.http.patch<ISuccess>(
      `${this.apiUrlEngine}?id=${id}&status=drive`,
      {}
    );
  }
}
