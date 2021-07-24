import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import StandardButton from './standard-button';
import { ProgramContext } from '../services/program-context';
import { BUTTON_COLOR, BUTTON_ACTIVE_COLOR } from '../styles/colors';

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

  const navigateToFilter = () => navigation.navigate('Filtro');

  const toggleFavorites = () => {
    if (!isFavoritesSelected) {
      Object.keys(filter).forEach(key => {
        if (key !== 'selectedFavoriteOptions') filter[key] = [];
      });
    }
    setFilter({
      ...filter,
      selectedFavoriteOptions: [!isFavoritesSelected]
    });
    setIsFavoritesSelected(!isFavoritesSelected);
  };

  return (
    <View style={styles.buttonsContainer}>
      <StandardButton
        onPress={navigateToFilter}
        buttonContainerStyle={{
          ...styles.filterButtonContainer,
          backgroundColor: isFilterSelected ? BUTTON_ACTIVE_COLOR : BUTTON_COLOR
        }}
      >
        <Text style={styles.favoritesText}> Filtro </Text>
      </StandardButton>
      <StandardButton
        buttonContainerStyle={styles.nowButtonContainer}
        onPress={() => goToNowEvent.current()}
      >
        <Text style={styles.favoritesText}> Ahora </Text>
      </StandardButton>
      <StandardButton
        onPress={toggleFavorites}
        buttonContainerStyle={{
          ...styles.favoritesButtonContainer,
          backgroundColor: isFavoritesSelected ? BUTTON_ACTIVE_COLOR : BUTTON_COLOR
        }}
      >
        <Text style={styles.favoritesText}> Favoritos </Text>
      </StandardButton>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row'
  },
  filterButtonContainer: {
    width: '33.333%'
  },
  nowButtonContainer: {
    width: '33.333%'
  },
  favoritesButtonContainer: {
    width: '33.333%'
  }
});

export default ProgramButtons;
