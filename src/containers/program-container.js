import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Program from '../components/program';
import ProgramButtons from '../components/program-buttons';
import { ProgramContext } from '../services/program-context';
import StandardButton from '../components/standard-button';
import MapButton from '../components/map-button';

import { filterShows } from '../helpers/program-helpers';

import { BUTTON_TEXT_COLOR } from '../styles/colors';

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
      <View style={{ height: '92%' }}>
        <Program
          navigation={navigation}
          shows={shows}
          goToNowEvent={goToNowEvent}
          isFilterActive={!!Object.values(filter).flat().length}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <MapButton
          navigation={navigation}
          buttonContainerStyle={{
            ...styles.bottomButtonContainer
          }}
        />
        <StandardButton
          onPress={() => navigation.navigate('Espacios')}
          buttonContainerStyle={{
            ...styles.bottomButtonContainer
          }}
        >
          <Text style={styles.buttonText}>
            Espacios
          </Text>
        </StandardButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '8%',
    flexDirection: 'row'
  },
  bottomButtonContainer: {
    width: '50%'
  },
  buttonText: {
    color: BUTTON_TEXT_COLOR,
    fontWeight: 'bold',
    letterSpacing: 0.5
  }
});

export default ProgramContainer;
