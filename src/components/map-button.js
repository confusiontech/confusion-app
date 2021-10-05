import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import StandardButton from './standard-button';
import { BUTTON_TEXT_COLOR } from '../styles/colors';

import { iconsMap } from '../helpers/icon-helpers';

const MapButton = ({ navigation, goToNowEvent }) => {
  return (
    <View style={styles.buttonsContainer}>
      <StandardButton
        onPress={() => navigation.navigate('Mapa')}
      >
        <Text style={styles.buttonText}>
          {iconsMap.get('map', iconProps)}
        </Text>
        <Text style={{ ...styles.buttonText, marginLeft: 8 }}>
          Mapa
        </Text>
      </StandardButton>
    </View>
  );
};

const iconProps = { color: BUTTON_TEXT_COLOR, size: 16 };

const styles = StyleSheet.create({
  buttonsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '8%'
  },
  buttonText: {
    color: BUTTON_TEXT_COLOR,
    fontWeight: 'bold',
    letterSpacing: 0.5
  }
});

export default MapButton;
