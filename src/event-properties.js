// export const EVENT_ID = '3cb8e68a-b03f-4a7d-b714-42a7ca56870a';

import { categories } from './helpers/program-helpers';

// export const EVENT_DATES = ['2019-10-19', '2019-10-20'];
export const EVENT_ID = '79a00aa4-2704-4581-9f2e-84b6549668b1'; // 2021
export const EVENT_DATES = ['2021-10-16', '2021-10-17']; // 2021

const EVENT_CATEGORIES_INFO = [
  ['0', 'Artes Escénicas', 'ESCENICAS'],
  ['1', 'Arte Urbano', 'ARTE_URBANO'],
  ['2', 'Audiovisual', 'AUDIOVISUAL'],
  ['3', 'Exposición', 'EXPOSICION'],
  ['4', 'Música', 'MUSICA'],
  ['5', 'Otros', 'OTROS'],
  ['6', 'Poesía', 'POESIA'],
  ['7', 'Talleres / Charlas', 'TALLERES'],
  ['8', 'Instalaciones Urbanas', 'INSTALACIONES']
];

export const EVENT_CATEGORIES = EVENT_CATEGORIES_INFO.map(categoryInfo =>
  [categoryInfo[0], categoryInfo[1]]
);

export const EVENT_SUBCATEGORIES_BY_KEY = EVENT_CATEGORIES_INFO.map(categoryInfo =>
  [categoryInfo[2], categoryInfo[0]]
);
