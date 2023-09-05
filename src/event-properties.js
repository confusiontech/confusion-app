// export const EVENT_ID = '3cb8e68a-b03f-4a7d-b714-42a7ca56870a';

// export const EVENT_DATES = ['2019-10-19', '2019-10-20'];
// export const EVENT_ID = '79a00aa4-2704-4581-9f2e-84b6549668b1'; // 2021
// export const EVENT_DATES = ['2021-10-16', '2021-10-17']; // 2021

// export const EVENT_ID = '880c990f-0ce9-48ed-8359-f1cb07467d6a'; // 2022
// export const EVENT_DATES = ['2022-10-15', '2022-10-16']; // 2022

export const EVENT_ID = '8f153391-0458-4e50-839d-9edd2346249f'; // 2023
export const EVENT_DATES = ['2023-10-14', '2023-10-15']; // 2023

export const EVENT_CATEGORIES_INFO = [
  { id: '0', name: 'Artes Escénicas', keys: ['ESCENICAS', 'ARTES_ESCENICAS'] },
  { id: '1', name: 'Arte Urbano', keys: ['ARTE_URBANO'] },
  { id: '2', name: 'Audiovisual', keys: ['AUDIOVISUAL'] },
  { id: '3', name: 'Exposición', keys: ['EXPOSICION', 'EXPO'] },
  { id: '4', name: 'Música', keys: ['MUSICA'] },
  { id: '5', name: 'Otros', keys: ['OTROS'] },
  { id: '6', name: 'Poesía', keys: ['POESIA'] },
  { id: '7', name: 'Talleres / Charlas', keys: ['TALLERES', 'CHARLAS', 'TALLERES_CHARLAS', 'CHARLAS_TALLERES'] },
  { id: '8', name: 'Instalaciones Urbanas', keys: ['INSTALACIONES', 'INSTALACIONES_URBANAS'] }
];

export const EVENT_CATEGORIES = EVENT_CATEGORIES_INFO.map(categoryInfo =>
  [categoryInfo.id, categoryInfo.name]
);
