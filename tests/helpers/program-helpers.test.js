import { programAdapter } from '../../src/helpers/program-helpers';

describe('programAdapter', () => {
  describe('cuando la short_description no incluye categorias', () => {
    test('devuelve un array con participant_subcategory y la short_description como tal', () => {
      const programItem = {
        short_description: 'test description',
        participant_subcategory: '3'
      };

      expect(programAdapter(programItem)).toStrictEqual(
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

      expect(programAdapter(programItem)).toStrictEqual(
        {
          ...programItem,
          participant_subcategories: ['0', '4'],
          short_description: 'test description'
        }
      );
    });
  });
});
