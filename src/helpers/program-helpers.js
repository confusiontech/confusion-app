import eventService from '../services/event-service';
import { getEsMoment } from './date-helpers';
import { matchCategoryByName } from './category-matcher';

const categoriesMap = eventService.getAllCategories();
const arrayMap = Array.from(categoriesMap);

export const categories = [
  ...arrayMap.map(category => {
    return {
      label: category[1],
      value: category[0],
      key: category[0]
    };
  })
];

export const dates = [
  ...eventService.getDates().map(date => {
    return {
      label: getEsMoment(date).format('dddd D'),
      value: date,
      key: date
    };
  })
];

export const favoriteOptions = [
  {
    label: 'Favoritos',
    value: true,
    key: true
  }
];

export const audiences = [
  {
    label: 'Todos los públicos',
    value: 'all_public',
    key: 'all_public'
  },
  {
    label: 'Adultos',
    value: 'adults',
    key: 'adults'
  },
  {
    label: 'Juvenil',
    value: 'young',
    key: 'young'
  },
  {
    label: 'Familiar',
    value: 'family',
    key: 'family'
  },
  {
    label: 'Infantil',
    value: 'baby',
    key: 'baby'
  }
];

export const filterShows = (allShows, favorites, propertiesConditionsObjs) => {
  const isShowSelectedConditions = propertiesConditionsObjs.reduce(
    (conditions, properties) => {
      if (properties.stateProperty.length !== 0) {
        if (properties.showProperty === 'favorites') {
          conditions.push(
            show => {
              return properties.stateProperty.includes(favorites.has(show.id));
            }
          );
        } else {
          conditions.push(
            show => properties.stateProperty.includes(show[properties.showProperty])
          );
        }
      }
      return conditions;
    }, [show => true]
  );

  const filteredShows = allShows.filter(show =>
    isShowSelectedConditions.every(condition => condition(show)));
  return filteredShows;
};

export const getParticipantCategory = show =>
  categoriesMap.get(show.participant_subcategory);

const publicMap = new Map([
  ['all_public', 'Todos los publicos'],
  ['baby', 'Infantil'],
  ['family', 'Familiar'],
  ['young', 'Juvenil'],
  ['adults', 'Adultos']
]);
export const getPublic = show =>
  publicMap.get(show.children) || publicMap.get('all_public');

export const getAddress = show => {
  const address = show.address;
  return `${address.route} ${address.street_number}`;
};

// export const getNow = () => new Date(2021, 9, 16, 19, 9).getTime();
export const getNow = () => new Date().getTime();

const tryMatchSubcategories = line => {
  // Lookahead and lookbehind don't work in Android, so we won't use them
  const categoryNames = line.match(/^\s*\((?<categories>[^)]+)\)\s*$/);

  const categoryKeys = categoryNames && categoryNames.groups && categoryNames.groups.categories.split(',').map(
    categoryName => matchCategoryByName(categoryName)
  ).filter(categoryKey => categoryKey);

  return categoryKeys && categoryKeys.length ? categoryKeys : undefined;
};

export const programAdapter = programItem => {
  const { short_description: shortDescription, participant_subcategory: participantSubcategory } = programItem;
  const lines = shortDescription.split('\n');

  let participantSubcategories;
  let finalShortDescription = shortDescription;

  for (let i = lines.length - 1; i >= 0; i--) {
    const lineContent = lines[i].trim();
    if (lineContent !== '') {
      participantSubcategories = tryMatchSubcategories(lineContent);
      if (participantSubcategories) {
        finalShortDescription = lines.slice(0, i).join('\n');
      }
      break;
    }
  }

  participantSubcategories = participantSubcategories || [participantSubcategory];

  return {
    ...programItem,
    participant_subcategories: participantSubcategories,
    short_description: finalShortDescription
  };
};
