import React, { useState, useEffect, useContext } from 'react';
import { View, Button } from 'react-native';

import Program from '../components/program';
import { ProgramContext } from '../services/program-context';

import { filterShows } from '../helpers/program-helpers';


const ProgramContainer = ({ navigation }) => {
  const { allShows, filter } = useContext(ProgramContext);
  const [shows, setShows] = useState(allShows);

  useEffect(() => {
    const propertiesConditions = [
      {
        showProperty: 'participant_subcategory',
        stateProperty: filter.selectedCategories,
      },
      {
        showProperty: 'children',
        stateProperty: filter.selectedAudience,
      },
      {
        showProperty: 'date',
        stateProperty: filter.selectedDate,
      },
    ];
    const filteredShows = filterShows(allShows, propertiesConditions);
    setShows(filteredShows);
  }, [allShows, filter]);

  const navigateToFilter = () => navigation.navigate('Filter');

  return (
    <View>
      <Button
        title="Filtro"
        onPress={navigateToFilter}
      />
      <Program navigation={navigation} shows={shows}/>
    </View>
  );
};

export default ProgramContainer;
