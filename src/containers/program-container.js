import React, { useState, useEffect, useContext, useRef } from 'react';
import { View } from 'react-native';

import Program from '../components/program';
import ProgramButtons from '../components/program-buttons';
import MapButton from '../components/map-button';
import { ProgramContext } from '../services/program-context';

import { filterShows } from '../helpers/program-helpers';

const ProgramContainer = ({ navigation }) => {
  const { allShows, filter, favorites } = useContext(ProgramContext);
  const [shows, setShows] = useState(allShows);

  const propertiesConditions = [
    {
      showProperty: 'participant_subcategories',
      stateProperty: filter.selectedCategories
    },
    {
      showProperty: 'children',
      stateProperty: filter.selectedAudience
    },
    {
      showProperty: 'date',
      stateProperty: filter.selectedDate
    },
    {
      showProperty: 'favorites',
      stateProperty: filter.selectedFavoriteOptions
    }
  ];

  useEffect(() => {
    const filteredShows = filterShows(allShows, favorites, propertiesConditions);
    setShows(filteredShows);
  }, [allShows, filter, favorites]);

  const goToNowEvent = useRef(null);

  return (
    <View style={{ flex: 1 }}>
      <ProgramButtons navigation={navigation} goToNowEvent={goToNowEvent} />
      <Program
        navigation={navigation}
        shows={shows}
        goToNowEvent={goToNowEvent}
        isFilterActive={!!Object.values(filter).flat().length}
      />
      <MapButton navigation={navigation} />
    </View>
  );
};

export default ProgramContainer;
