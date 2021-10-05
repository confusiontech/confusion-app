import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import StandardButton from './standard-button';
import { ProgramContext } from '../services/program-context';
import { BUTTON_COLOR, BUTTON_ACTIVE_COLOR, BUTTON_TEXT_COLOR } from '../styles/colors';

import { iconsMap } from '../helpers/icon-helpers';

const ProgramButtons = ({ navigation, goToNowEvent }) => {
  const { filter } = useContext(ProgramContext);

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

  return (
    <View style={styles.buttonsContainer}>
      <StandardButton
        onPress={navigateToFilter}
        buttonContainerStyle={{
          ...styles.filterButtonContainer,
          backgroundColor: isFilterSelected ? BUTTON_ACTIVE_COLOR : BUTTON_COLOR
        }}
      >
        <Text style={styles.buttonText}>
          {iconsMap.get('filter', iconProps)} Filtro
        </Text>
      </StandardButton>
      <StandardButton
        onPress={() => navigation.navigate('Favoritos')}
        buttonContainerStyle={{
          ...styles.favoritesButtonContainer
        }}
      >
        <Text style={styles.buttonText}>
          {iconsMap.get('favorites-chosen', iconProps)} Favoritos
        </Text>
      </StandardButton>
      <StandardButton
        buttonContainerStyle={styles.nowButtonContainer}
        onPress={() => goToNowEvent.current()}
      >
        <Text style={styles.buttonText}>
          {iconsMap.get('now', iconProps)} Ahora
        </Text>
      </StandardButton>
    </View>
  );
};

const iconProps = { color: BUTTON_TEXT_COLOR, size: 16 };

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
  },
  buttonText: {
    color: BUTTON_TEXT_COLOR,
    fontWeight: 'bold',
    letterSpacing: 0.5
  }
});

export default ProgramButtons;
