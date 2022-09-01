import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StandardButton from '../components/standard-button';
import MapButton from '../components/map-button';

import { BUTTON_TEXT_COLOR } from '../styles/colors';

const NavigationBar = ({ navigation, style }) => {
  return (
    <View style={style}>
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
  );
};

const styles = StyleSheet.create({
  bottomButtonContainer: {
    width: '50%'
  },
  buttonText: {
    color: BUTTON_TEXT_COLOR,
    fontWeight: 'bold',
    letterSpacing: 0.5
  }
});

export default NavigationBar;
