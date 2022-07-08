import { programAdapter, findCurrentShowIndex } from '../../src/helpers/program-helpers';

describe('programAdapter', () => {
  describe('cuando la short_description no incluye categorias', () => {
    test('devuelve un array con participant_subcategory y la short_description como tal', () => {
      const programItem = {
        short_description: 'test description',
        participant_subcategory: '3'
      };

      programAdapter([programItem]);

      expect(programItem).toStrictEqual(
        {
          ...programItem,
          participant_subcategories: [programItem.participant_subcategory],
          short_description: programItem.short_description
        }
      );
    });
  });

  describe('cuando la short_description incluye categorias', () => {
    test('devuelve un array con las categorias y la short_description sin ellas', () => {
      const programItem = {
        short_description: 'test description\n (ESCENICAS, MUSICA    )\n ',
        participant_subcategory: '3'
      };

      programAdapter([programItem]);

      expect(programItem).toStrictEqual(
        {
          ...programItem,
          participant_subcategories: ['0', '4'],
          short_description: 'test description'
        }
      );
    });
  });

  describe('dada una short_description con categorías con errores', () => {
    test('cuando solicitamos las categorías devuelve el resultado que más se asemeja', () => {
      const programItem = {
        short_description: 'test description\n (audiovisuales, escénicas, Música, Poesías, istalaciones   , artes                       Escénicas, charlas  , expo , artes  Urbanos, instalación Urbana )\n ',
        participant_subcategory: '3'
      };

      programAdapter([programItem]);

      expect(programItem).toStrictEqual(
        {
          ...programItem,
          participant_subcategories: ['2', '0', '4', '6', '8', '0', '7', '3', '1', '8'],
          short_description: 'test description'
        }
      );
    });
  });

  describe('dada una short_description con categorías sin semejanza', () => {
    test('cuando solicitamos las categorías devuelve un array con participant_subcategory y la short_description como tal', () => {
      const programItem = {
        short_description: 'test description\n (conFusión, carrera de relevos, concurso de bofetadas )\n ',
        participant_subcategory: '3'
      };

      programAdapter([programItem]);

      expect(programItem).toStrictEqual(
        {
          ...programItem,
          participant_subcategories: ['3'],
          short_description: 'test description\n (conFusión, carrera de relevos, concurso de bofetadas )\n '
        }
      );
    });
  });
});

describe('findCurrentShowIndex', () => {
  const toEpoch = (hhmm) => {
    const parts = hhmm.split(':');
    const baseDt = 1634374800;

    const hourValue = parseInt(parts[0]) * 60 * 60;
    const minuteValue = parseInt(parts[1]) * 60;

    return (baseDt + hourValue + minuteValue) * 1000;
  };

  const makeShow = (name, start, end) => {
    return {
      short_description: name,
      time: [
        '' + toEpoch(start),
        '' + toEpoch(end)
      ]
    };
  }

  describe('dada una lista de actividades vacía', () => {
    test('cuando solicitamos el índice de la actividad en curso devuelve -1', () => {
      const shows = [];
      const nowDt = toEpoch("12:00");
      expect(findCurrentShowIndex(shows, nowDt)).toStrictEqual(-1);
    });
  });

  describe('dada una lista con una actividad que ha comenzado hace menos de 10 minutos', () => {
    test('cuando solicitamos el índice de la actividad en curso nos devuelve el índice de la primera actividad que ha comenzado hace menos de 10 minutos', () => {
      const shows = [
        makeShow("A", "09:00", "10:00"),
        makeShow("B", "09:30", "12:00"),
        makeShow("C", "09:37", "10:45")
      ];

      let nowDt = toEpoch("09:39");

      // La segunda actividad ha comenzado hace 9 minutos.
      // La tercera también ha comenzado, pero la función nos tiene que devolver la primera
      // actividad que cumple con el requisito.
      expect(findCurrentShowIndex(shows, nowDt)).toStrictEqual(1);

      nowDt = toEpoch("09:42");

      // Ahora la segunda actividad ha comenzado hace más de 10 minutos, así que
      // la función nos tiene que devoler la tercera actividad.
      expect(findCurrentShowIndex(shows, nowDt)).toStrictEqual(2);
    });
  });

  describe('dada una lista con todas las actividades por comenzar', () => {
    const shows = [
      makeShow('A', "15:00", "16:00"),
      makeShow('B', "15:30", "16:45"),
      makeShow('C', "17:00", "21:00")
    ];
    
    describe('y ninguna actividad que comience dentro de menos de 20 minutos', () => {
      const nowDt = toEpoch("03:00");

      test('cuando solicitamos el índice de la actividad en curso nos devuelve el índice de la primera actividad', () => {
        expect(findCurrentShowIndex(shows, nowDt)).toStrictEqual(0);
      });
    });

    describe('y una actividad que comienza dentro de menos de 20 minutos', () => {
      const nowDt = toEpoch("14:41");

      test('cuando solicitamos el índice de la actividad en curso nos devuelve el índice de la primera actividad', () => {
        expect(findCurrentShowIndex(shows, nowDt)).toStrictEqual(0);
      });
    });
  });

  describe('dada una lista sin ninguna actividad en curso', () => {
    const shows = [
      makeShow('A', "08:00", "11:00"),
      makeShow('B', "10:30", "13:00"),
      makeShow('C', "12:00", "12:20"),
      makeShow('D', "17:00", "17:35"),
      makeShow('F', "17:00", "18:00")
    ];

    describe('y ninguna actividad que comience dentro de menos de 20 minutos', () => {
      const nowDt = toEpoch("16:35");
      
      test('cuando solicitamos el índice de la actividad en curso nos devuelve el índice de la próxima actividad', () => {
        // Actividad D
        expect(findCurrentShowIndex(shows, nowDt)).toStrictEqual(3);
      });
    });

    describe('y una actividad que comienza dentro de menos de 20 minutos', () => {
      const nowDt = toEpoch("16:43");
      
      test('cuando solicitamos el índice de la actividad en curso nos devuelve el índice de la próxima actividad', () => {
        // Actividad D
        expect(findCurrentShowIndex(shows, nowDt)).toStrictEqual(3);
      });
    });
  });

  describe('dada una lista con una actividad que ha comenzado hace más de 10 minutos', () => {
    describe('y ninguna actividad que haya comenzado hace menos de 10 minutos', () => {
      const shows = [
        makeShow('A', "10:00", "11:15"),
        makeShow('B', "10:30", "13:00"),
        makeShow('C', "12:00", "12:20"),
        makeShow('D', "13:00", "14:00")
      ];

      describe('y ninguna actividad que comience dentro de menos de 20 minutos', () => {
        test('cuando solicitamos el índice de la actividad en curso nos devuelve el índice de la primera actividad en curso', () => {
          let nowDt = toEpoch("11:39");
          // Actividad B, porque C empieza dentro de 21 minutos
          expect(findCurrentShowIndex(shows, nowDt)).toStrictEqual(1);

          nowDt = toEpoch("11:10");

          debugger;
          // Actividad A. A las 11:10 A y B están ambas activas pero debería devolver la primera
          const newIndex = findCurrentShowIndex(shows, nowDt);
          expect(newIndex).toStrictEqual(0);
        });
      });
      
      describe('y una actividad que comienza dentro de menos de 20 minutos', () => {
        const nowDt = toEpoch("11:41");
        
        test('cuando solicitamos el índice de la actividad en curso nos devuelve el índice de la actividad que está a punto de comenzar', () => {
          // Actividad C, que empieza dentro de 19 minutos
          expect(findCurrentShowIndex(shows, nowDt)).toStrictEqual(2);
        });
      });
    });
  });

  describe('dada una lista una actividad terminada que ha comenzado hace menos de 10 minutos', () => {
    // Edge case de una microactividad de 5 minutos...
    const shows = [
      makeShow('A', "10:00", "11:00"),
      makeShow('B', "11:30", "11:35"),
      makeShow('C', "13:00", "13:30"),
      makeShow('D', "13:00", "14:50")
    ];
    
    describe('y ninguna actividad que comience dentro de menos de 20 minutos', () => {
      const nowDt = toEpoch("11:36");
      
      test('cuando solicitamos el índice de la actividad en curso nos devuelve el índice de la próxima actividad', () => {
        // Actividad C
        expect(findCurrentShowIndex(shows, nowDt)).toStrictEqual(2);
      });
    });
  });

  describe('dada una lista una actividad que comienza en ahora mismo', () => {
    describe('y ninguna actividad que haya comenzado hace menos de 10 minutos', () => {
      const shows = [
        makeShow('A', "10:00", "11:00"),
        makeShow('B', "11:30", "12:00"),
        makeShow('C', "12:40", "13:30")
      ];
      
      const nowDt = toEpoch("11:30");
      
      test('cuando solicitamos el índice de la actividad en curso nos devuelve el índice de la pŕoxima actividad', () => {
        // Actividad B
        expect(findCurrentShowIndex(shows, nowDt)).toStrictEqual(1);
      });
    });

    describe('y una actividad que ha comenzado hace menos de 10 minutos', () => {
      const shows = [
        makeShow('A', "11:25", "11:50"),
        makeShow('B', "11:30", "12:00"),
        makeShow('C', "12:40", "13:30")
      ];
      
      const nowDt = toEpoch("11:30");
      
      test('cuando solicitamos el índice de la actividad en curso nos devuelve el índice de la actividad que ha comenzado hace menos de 10 minutos', () => {
        // Actividad A
        expect(findCurrentShowIndex(shows, nowDt)).toStrictEqual(0);
      });
    });
  });
});
