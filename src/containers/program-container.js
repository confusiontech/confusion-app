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
        showProperty: 'participant_category',
        stateProperty: filter.selectedCategory
      },
      {
        showProperty: 'date',
        stateProperty: filter.selectedDate
      }
    ];
    const filteredShows = filterShows(allShows, propertiesConditions);
    setShows(filteredShows);
  }, [allShows, filter]);


  return (
      <View style={{flex: 1}}>
      <View style={{flex: 0.9998}}>
      <Program shows={shows}/>
      </View>

      <Button
        title="Filtro"
        onPress={() => navigation.navigate('Filter')}
      />
    </View>
  );
};

export default ProgramContainer;
