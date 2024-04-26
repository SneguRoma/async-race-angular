export const UNUPDATECAR_ID = -1;
export const NAMES = [
  'Opel',
  'Opelek',
  'Opelishche',
  'Opelushecka',
  'Opelundra',
  'Opelulechka',
  'Opeleshenka',
  'Opelenochka',
  'Opeluha',
  'Opelusechka',
];
export const MODELS = [
  'Astra',
  'Cadett',
  'Vectra',
  'Zafira',
  'Adam',
  'Mokka',
  'Wiski',
  'Rom',
  'Wine',
  'Beer',
];
export const COLORS = '0123456789abcdef';
export const MINRANDOM = 0;
export const MAXNAMES = NAMES.length;
export const MAXMODELS = MODELS.length;
export const MAXCOLORS = COLORS.length;
export const COUNT_CARS = 100;
export const NONUPDATABLE_ID = -1;
export const getRandom = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};
