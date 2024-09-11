import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import StandardButton from './standard-button';
import { ProgramContext } from '../services/program-context';
import { BUTTON_COLOR, BUTTON_ACTIVE_COLOR, BUTTON_TEXT_COLOR, BUTTON_ACTIVE_TEXT_COLOR } from '../styles/colors';

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

  const iconProps = { color: BUTTON_TEXT_COLOR, size: 16 };
  const textColorFilterActive = isFilterSelected ? BUTTON_ACTIVE_TEXT_COLOR : BUTTON_TEXT_COLOR;

  return (
    <View style={styles.buttonsContainer}>
      <StandardButton
        onPress={navigateToFilter}
        buttonContainerStyle={{
          ...styles.filterButtonContainer,
          backgroundColor: isFilterSelected ? BUTTON_ACTIVE_COLOR : BUTTON_COLOR
        }}
      >
        <Text style={{
          ...styles.buttonText,
          color: textColorFilterActive
        }}
        >
          {iconsMap.get(
            'filter',
            { ...iconProps, color: textColorFilterActive }
          )} Filtro
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

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row'
  },
  filterButtonContainer: {
    width: '50%'
  },
  nowButtonContainer: {
    width: '50%'
  },
  buttonText: {
    color: BUTTON_TEXT_COLOR,
    fontWeight: 'bold',
    letterSpacing: 0.5
  }
});

export default ProgramButtons;
