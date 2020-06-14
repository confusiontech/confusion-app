import eventService from '../services/event-service'

export const categories = [
  {
    label: 'Todas',
    value: 'all',
    key: 'all'
  },
  ...eventService.getAllCategories().map( category => {
    return {
      label: category.name,
      value: category.id,
      key: category.id
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
      if (properties.stateProperty != 'all') {
        conditions.push( 
          show => show[properties.showProperty] == properties.stateProperty
        );
      }
      return conditions;
    }, [show => true]
  ) 
  const filteredShows = allShows.filter(show => 
    isShowSelectedConditions.every(condition => condition(show)));
  return filteredShows;
}