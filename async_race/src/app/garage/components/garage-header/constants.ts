export const UNUPDATECAR_ID = -1;
export const NAMES = [
  'opel',
  'opelek',
  'opelishche',
  'opelushecka',
  'opelundra',
  'opelulechka',
  'opeleshenka',
  'opelenochka',
  'opeluha',
  'opelusechka',
];
export const MODELS = [
  'astra',
  'cadett',
  'vectra',
  'zafira',
  'adam',
  'Mokka',
  'wiski',
  'rom',
  'wine',
  'beer',
];
export const COLORS = '0123456789abcdef';
export const MINRANDOM = 0;
export const MAXNAMES = NAMES.length;
export const MAXMODELS = MODELS.length;
export const MAXCOLORS = COLORS.length;
export const COUT_CARS = 100;
export const getRandom = (min: number, max: number):number => {
  return Math.floor(Math.random() * (max - min) + min);
};