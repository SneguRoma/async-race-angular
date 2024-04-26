import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ICar, ICarStartStop, IGetCars, INewCar, ISuccess } from '../garage/models/garage.model';
import { DEFAULT_CAR_LIMIT, DEFAULT_PAGE, DEFAULT_TOTALCOUNT } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrlGarage = 'http://127.0.0.1:3000/garage';
  private apiUrlEngine = 'http://127.0.0.1:3000/engine';

  constructor(private http: HttpClient) {}

  getCars(page: number = DEFAULT_PAGE, limit: number = DEFAULT_CAR_LIMIT): Observable<IGetCars> {
    let params = new HttpParams();
    if (page) {
      params = params.set('_page', page.toString());
    }
    if (limit) {
      params = params.set('_limit', limit.toString());
    }
    return this.http
      .get<{ data: ICar[]; totalCount: number }>(this.apiUrlGarage, {
        params,
        observe: 'response',
      })
      .pipe(
        map((response) => {
          const totalCount = response.headers.get('X-Total-Count');
          return {
            data: response.body as unknown as ICar[],
            totalCount: totalCount ? parseInt(totalCount) : DEFAULT_TOTALCOUNT,
          };
        }),
      );
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
    return this.http.patch<ICarStartStop>(`${this.apiUrlEngine}?id=${id}&status=started`, {});
  }

  stopEngine(id: number): Observable<ICarStartStop> {
    return this.http.patch<ICarStartStop>(`${this.apiUrlEngine}?id=${id}&status=stopped`, {});
  }

  startDrive(id: number): Observable<ISuccess> {
    return this.http.patch<ISuccess>(`${this.apiUrlEngine}?id=${id}&status=drive`, {});
  }
}
