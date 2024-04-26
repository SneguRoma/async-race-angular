export interface ICar {
  name: string;
  color: string;
  id: number;
}

export interface ICarWinner {
  car: ICar;
  time: string;
}

export interface INewCar {
  name: string;
  color: string;
}

export interface ICarStartStop {
  velocity: number;
  distance: number;
}

export interface ISuccess {
  success: boolean;
}
