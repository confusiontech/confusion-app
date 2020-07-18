import eventService from '../services/event-service'

const arrayMap = Array.from(eventService.getAllCategories());

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