import React from 'react';
import { StyleSheet, Text } from 'react-native';

import StandardButton from './standard-button';
import { BUTTON_TEXT_COLOR } from '../styles/colors';

import { iconsMap } from '../helpers/icon-helpers';
import { View } from 'native-base';

const MapButton = ({ navigation, buttonContainerStyle }) => {
  return (
    <StandardButton
      onPress={() => navigation.navigate('Mapa')}
      buttonContainerStyle={buttonContainerStyle}
    >
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.buttonText}>
          {iconsMap.get('map', iconProps)}
        </Text>
        <Text style={{ ...styles.buttonText, marginLeft: 8 }}>
          Mapa
        </Text>
      </View>
    </StandardButton>
  );
};

const iconProps = { color: BUTTON_TEXT_COLOR, size: 16 };

const styles = StyleSheet.create({
  buttonText: {
    color: BUTTON_TEXT_COLOR,
    fontWeight: 'bold',
    letterSpacing: 0.5
  }
});

export default MapButton;
