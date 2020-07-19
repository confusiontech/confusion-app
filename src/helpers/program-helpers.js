import eventService from '../services/event-service'

const categoriesMap = eventService.getAllCategories();
const arrayMap = Array.from(categoriesMap);

export const categories = [
  {
    label: 'Todas',
    value: 'all',
    key: 'all'
  },
  ...arrayMap.map( category => {
    return {
      label: category[1],
      value: category[0],
      key: category[0]
    }
  })
];

export const dates = [
  {
    label: 'Todos',
    value: 'all',
    key: 'all'
  },
  ...eventService.getDates().map( date => {
    return {
      label: date,
      value: date,
      key: date
    }
  })
];

export const filterShows = (allShows, propertiesConditionsObjs) => {
  const isShowSelectedConditions = propertiesConditionsObjs.reduce(
    (conditions, properties) => {
      if (properties.stateProperty.length !== 0) {
        conditions.push( 
          show => properties.stateProperty.includes(show[properties.showProperty])
        );
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
