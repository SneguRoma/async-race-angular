import { ICar } from '../../garage/models/garage.model';

export interface IWin {
  id: number;
  wins: number;
  time: number;
}

export interface IWinUpdate {
  wins: number;
  time: number;
}

export interface IWinners {
  car: ICar;
  id: number;
  wins: number;
  time: number;
}

export interface IGetWinners {
  data: IWin[];
  totalCount: number;
}

export interface IWinSort{
    field: SortField,
    order: SortOrder 
}

export type SortField = 'id' | 'wins' | 'time';
export type SortOrder = 'ASC' | 'DESC';