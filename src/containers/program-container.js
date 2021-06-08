import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Button, StyleSheet } from 'react-native';

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

  const gotToNowEvent = useRef(null);

  const navigateToFilter = () => navigation.navigate('Filter');

  return (
    <View>
      <View style={styles.buttonContainer}>
        <View style={styles.filterButton}>
          <Button
            title="Filtro"
            onPress={navigateToFilter}
          />
        </View>
        <View style={styles.nowButton}>
          <Button
            title="Ahora"
            onPress={() => gotToNowEvent.current()}
          />
        </View>
      </View>
      <Program navigation={navigation} shows={shows} gotToNowEvent={gotToNowEvent}/>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
  },
  filterButton: {
    width:'50%',
    borderLeftWidth: 1,
  },
  nowButton: {
    width: '50%',
  }
})

export default ProgramContainer;
