import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IGetWinners, IWin, IWinUpdate } from '../winners/models/winner.models';
import { DEFAULT_TOTALCOUNT } from '../constants/constants';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

@Injectable({
  providedIn: 'root',
})
export class WinnerService {
  private apiUrl = 'http://127.0.0.1:3000/winners';

  constructor(private http: HttpClient) {}

  getWinners(
    page: number = DEFAULT_PAGE,
    limit: number = DEFAULT_LIMIT,
    sort: string = 'id',
    order: string = 'ASC',
  ): Observable<IGetWinners> {
    let params = new HttpParams();
    if (page) {
      params = params.set('_page', page.toString());
    }
    if (limit) {
      params = params.set('_limit', limit.toString());
    }
    if (sort) {
      params = params.set('_sort', sort);
    }
    if (order) {
      params = params.set('_order', order);
    }

    return this.http
      .get<{ data: IWin[]; totalCount: number }>(this.apiUrl, {
        params,
        observe: 'response',
      })
      .pipe(
        map((response) => {
          const totalCount = response.headers.get('X-Total-Count');
          return {
            data: response.body as unknown as IWin[],
            totalCount: totalCount ? parseInt(totalCount) : DEFAULT_TOTALCOUNT,
          };
        }),
      );
  }

  getWinner(id: number): Observable<IWin> {
    return this.http.get<IWin>(`${this.apiUrl}/${id}`);
  }

  addWinner(winner: IWin): Observable<IWin> {
    return this.http.post<IWin>(this.apiUrl, winner);
  }

  updateWinner(id: number, winner: IWinUpdate): Observable<IWin> {
    return this.http.put<IWin>(`${this.apiUrl}/${id}`, winner);
  }

  deleteWinner(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
