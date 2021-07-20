import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'native-base';

import { ProgramContext } from '../services/program-context';

const BUTTON_COLOR = 'pink';
const BUTTON_ACTIVE_COLOR = 'yellow';

const ProgramButtons = ({ navigation, goToNowEvent }) => {
  const { filter, setFilter } = useContext(ProgramContext);
  const [isFavoritesSelected, setIsFavoritesSelected] = useState(filter.selectedFavoriteOptions[0]);

  const isFilterActive = () => {
    return !!Object.keys(filter)
      .map(key => key === 'selectedFavoriteOptions' ? [] : filter[key])
      .flat()
      .length;
  };
  const [isFilterSelected, setIsFilterSelected] = useState(isFilterActive());

  useEffect(() => {
    setIsFilterSelected(isFilterActive());
  }, [filter]);

  const navigateToFilter = () => navigation.navigate('Filter');

  const toggleFavorites = () => {
    Object.keys(filter).forEach(key => {
      if (key !== 'selectedFavoriteOptions') filter[key] = [];
    });
    setFilter({
      ...filter,
      selectedFavoriteOptions: [!isFavoritesSelected]
    });
    setIsFavoritesSelected(!isFavoritesSelected);
  };

  return (
    <View style={styles.buttonsContainer}>
      <View style={{
        ...styles.filterButtonContainer,
        backgroundColor: isFilterSelected ? BUTTON_ACTIVE_COLOR : BUTTON_COLOR
      }}
      >
        <Button
          transparent
          onPress={navigateToFilter}
          style={styles.button}
        >
          <Text style={styles.favoritesText}> Filtro </Text>
        </Button>
      </View>
      <View style={styles.nowButtonContainer}>
        <Button
          transparent
          onPress={() => goToNowEvent.current()}
          style={styles.button}
        >
          <Text style={styles.favoritesText}> Ahora </Text>
        </Button>

      </View>
      <View style={{
        ...styles.favoritesButtonContainer,
        backgroundColor: isFavoritesSelected ? BUTTON_ACTIVE_COLOR : BUTTON_COLOR
      }}
      >
        <Button
          transparent
          onPress={toggleFavorites}
          style={styles.button}
        >
          <Text style={styles.favoritesText}> Favoritos </Text>
        </Button>
      </View>
    </View>
  );
};

const buttonsContainer = {
  justifyContent: 'center',
  backgroundColor: BUTTON_COLOR,
  borderWidth: 1
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row'
  },
  filterButtonContainer: {
    ...buttonsContainer,
    width: '33.333%'
  },
  nowButtonContainer: {
    ...buttonsContainer,
    width: '33.333%'
  },
  favoritesButtonContainer: {
    ...buttonsContainer,
    width: '33.333%'
  },
  button: {
    justifyContent: 'center'
  },
  favoritesText: {}
});

export default ProgramButtons;
