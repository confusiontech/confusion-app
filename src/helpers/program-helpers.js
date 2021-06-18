import eventService from '../services/event-service'
import { getEsMoment } from './date-helpers'

const categoriesMap = eventService.getAllCategories();
const arrayMap = Array.from(categoriesMap);

export const categories = [
  ...arrayMap.map( category => {
    return {
      label: category[1],
      value: category[0],
      key: category[0]
    }
  })
];

export const dates = [
  ...eventService.getDates().map( date => {
    return {
      label: getEsMoment(date).format('dddd D'),
      value: date,
      key: date
    }
  })
];

export const favoriteOptions = [
  {
    label: 'Favoritos',
    value: true,
    key: true,
  }
]

export const audiences = [
  {
    label: 'Todos los públicos',
    value: 'all_public',
    key: 'all_public'
  },
  {
    label: 'Infantil',
    value: 'baby',
    key: 'baby'
  },
  {
    label: 'Familiar',
    value: 'family',
    key: 'family'
  },
  {
    label: 'Juvenil',
    value: 'young',
    key: 'young'
  },
  {
    label: 'Adultos',
    value: 'adults',
    key: 'adults'
  },
]

export const filterShows = (allShows, favorites, propertiesConditionsObjs) => {
  const isShowSelectedConditions = propertiesConditionsObjs.reduce(
    (conditions, properties) => {
      if (properties.stateProperty.length !== 0) {
        if (properties.showProperty == 'favorites') {
          conditions.push( 
            show => {
              return properties.stateProperty.includes(favorites.has(show.id))
            } 
          )
        }
        else {
          conditions.push( 
            show => properties.stateProperty.includes(show[properties.showProperty])
          );
        }
      }
      return conditions;
    }, [show => true]
  ) 
  const filteredShows = allShows.filter(show => 
    isShowSelectedConditions.every(condition => condition(show)));
  return filteredShows;
}

export const getParticipantCategory = show => 
  categoriesMap.get(show.participant_subcategory);

const publicMap = new Map([
  ['all_public', 'Todos los publicos'],
  ['baby','Infantil'],
  ['family', 'Familiar'],
  ['young', 'Juvenil'],
  ['adults', 'Adultos'],
])
export const getPublic = show => 
  publicMap.get(show.children);

export const getAddress = show => {
  const address = show.address;
  return `${address.route} ${address.street_number}`;
}
