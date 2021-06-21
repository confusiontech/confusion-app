import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Button, StyleSheet } from 'react-native';

import Program from '../components/program';
import { ProgramContext } from '../services/program-context';

import { filterShows } from '../helpers/program-helpers';

const ProgramContainer = ({ navigation }) => {
  const { allShows, filter, favorites } = useContext(ProgramContext);
  const [shows, setShows] = useState(allShows);

  useEffect(() => {
    const propertiesConditions = [
      {
        showProperty: 'participant_subcategory',
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
    const filteredShows = filterShows(allShows, favorites, propertiesConditions);
    setShows(filteredShows);
  }, [allShows, filter, favorites]);

  const goToNowEvent = useRef(null);

  const navigateToFilter = () => navigation.navigate('Filter');

  return (
    <View>
      <View style={styles.buttonContainer}>
        <View style={styles.filterButton}>
          <Button
            title='Filtro'
            onPress={navigateToFilter}
          />
        </View>
        <View style={styles.nowButton}>
          <Button
            title='Ahora'
            onPress={() => goToNowEvent.current()}
          />
        </View>
      </View>
      <Program navigation={navigation} shows={shows} goToNowEvent={goToNowEvent} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row'
  },
  filterButton: {
    width: '50%',
    borderLeftWidth: 1
  },
  nowButton: {
    width: '50%'
  }
});

export default ProgramContainer;
