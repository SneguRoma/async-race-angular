import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICar, ICarStartStop, INewCar, ISuccess } from '../models/garage.model';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 7;


@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://127.0.0.1:3000/garage';
  

  constructor(private http: HttpClient) { }

  getCars(page: number = DEFAULT_PAGE, limit: number = DEFAULT_LIMIT): Observable<ICar[]> {
    const url = `${this.apiUrl}?_page=${page}&_limit=${limit}`;
    return this.http.get<ICar[]>(url);
  }

  getCar(id: number): Observable<ICar> {
    return this.http.get<ICar>(`${this.apiUrl}/${id}`);
  }

  addCar(car: INewCar): Observable<ICar> {
    return this.http.post<ICar>(this.apiUrl, car);
  }

  updateCar(id: number, car: INewCar): Observable<ICar> {
    return this.http.put<ICar>(`${this.apiUrl}/${id}`, car);
  }

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  startEngine(id: number): Observable<ICarStartStop> {
    return this.http.patch<ICarStartStop>(`${this.apiUrl}/engine?id=${id}&status=started`, {});
  }

  stopEngine(id: number): Observable<ICarStartStop> {
    return this.http.patch<ICarStartStop>(`${this.apiUrl}/engine?id=${id}&status=stopped`, {});
  }

  startDrive(id: number): Observable<ISuccess> {
    return this.http.patch<ISuccess>(`${this.apiUrl}/engine?id=${id}&status=drive`, {});
  }
}
