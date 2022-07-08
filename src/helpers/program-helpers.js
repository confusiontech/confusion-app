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
        } else if (properties.showProperty === 'participant_subcategories') {
          conditions.push(
            show => {
              for (const category of show[properties.showProperty]) {
                if (properties.stateProperty.includes(category)) {
                  return true;
                }
              }
              return false;
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

export const getParticipantCategoryById = categoryId =>
  categoriesMap.get(categoryId);

export const getParticipantCategory = show =>
  getParticipantCategoryById(show.participant_subcategory);

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

export const programAdapter = program => {
  program.forEach(programItem => {
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

    programItem.participant_subcategories = participantSubcategories;
    programItem.short_description = finalShortDescription;
  });
};

const TEN_MINUTES = 10 * 60 * 1000;

export const findCurrentShowIndex = (shows, nowDt) => {
  if (shows.length === 0) {
    return -1;
  }

  let next = null;
  let active = null;

  for (let index = 0; index < shows.length; ++index) {
    const show = shows[index];
    const start = show.time[0];
    const end = show.time[1];

    if (start < nowDt) {
      if (end > nowDt && start >= nowDt - TEN_MINUTES) {
        // Prioridad 1: actividad en curso que ha comenzado hace menos de 10 minutos
        return index;
      } else if (active == null && end > nowDt) {
        // Guardamos la primera actividad en curso por si no encontramos ninguna
        // candidata mejor para devolver.
        active = index;
      }
    } else {
      if (start <= nowDt + TEN_MINUTES * 2) {
        // Prioridad 2: actividad que comienza dentro de menos de 20 minutos
        return index;
      } else {
        next = index;
        break;
      }
    }
  }

  if (active != null) {
    // Prioridad 3: actividad en curso que ha comenzado hace más de 10 minutos
    return active;
  } else if (next != null) {
    // Prioridad 4: la siguiente actividad
    return next;
  } else {
    // Si todas las actividades han pasado ya, devolvemos la primera actividad
    return 0;
  }
};
