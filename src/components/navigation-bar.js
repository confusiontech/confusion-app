import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StandardButton from '../components/standard-button';
import { iconsMap } from '../helpers/icon-helpers';

import { BUTTON_TEXT_COLOR } from '../styles/colors';

import { useRoute } from '@react-navigation/native';

const NavigationBar = ({ navigation }) => {
  const route = useRoute();

  const NavButton = ({ routeName, buttonTitle, iconName }) => {
    return (
      <StandardButton
        onPress={() => navigation.navigate(routeName)}
        buttonContainerStyle={route.name === routeName
          ? styles.selectedButtonContainer
          : styles.bottomButtonContainer}
      >
        <Text style={styles.buttonText}>
          {iconsMap.get(iconName, iconProps)} {buttonTitle}
        </Text>
      </StandardButton>
    );
  };

  return (
    <View style={styles.buttonsContainer}>
      {NavButton({ routeName: 'Programa', buttonTitle: 'Programa', iconName: 'book' })}
      {NavButton({ routeName: 'Favoritos', buttonTitle: 'Favoritos', iconName: 'favorites-chosen' })}
      {NavButton({ routeName: 'Mapa', buttonTitle: 'Mapa', iconName: 'map' })}
      {NavButton({ routeName: 'Espacios', buttonTitle: 'Espacios', iconName: 'home' })}
      {NavButton({ routeName: 'Info', buttonTitle: 'Info', iconName: 'info' })}
    </View>
  );
};

const iconProps = { color: BUTTON_TEXT_COLOR, size: 16 };

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%'
  },
  bottomButtonContainer: {
    width: '25%'
  },
  buttonText: {
    color: BUTTON_TEXT_COLOR,
    fontWeight: 'bold',
    letterSpacing: 0.5
  },
  selectedButtonContainer: {
    width: '25%',
    backgroundColor: 'red'
  }
});

export default NavigationBar;
