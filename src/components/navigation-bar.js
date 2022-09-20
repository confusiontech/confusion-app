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
        <Text style={styles.buttonIcon}>
          {iconsMap.get(iconName, iconProps)}
        </Text>
        <Text style={styles.buttonText}>
          {buttonTitle}
        </Text>
      </StandardButton>
    );
  };

  return (
    <View style={styles.buttonsContainer}>
      {NavButton({ routeName: 'Programa', buttonTitle: 'Programa', iconName: 'book' })}
      {NavButton({ routeName: 'Favoritos', buttonTitle: 'Favoritos', iconName: 'favorites-chosen' })}
      {NavButton({ routeName: 'Mapa', buttonTitle: 'Mapa', iconName: 'map' })}
      {NavButton({ routeName: 'Espacios', buttonTitle: 'Espacios', iconName: 'space' })}
      {NavButton({ routeName: 'Info', buttonTitle: 'Info', iconName: 'info' })}
    </View>
  );
};

const iconProps = { color: BUTTON_TEXT_COLOR, size: 18 };

const NAV_BUTTON_WITH = '20%';

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%'
  },
  bottomButtonContainer: {
    width: NAV_BUTTON_WITH
  },
  selectedButtonContainer: {
    backgroundColor: 'red',
    width: NAV_BUTTON_WITH
  },
  buttonText: {
    color: BUTTON_TEXT_COLOR,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    fontSize: 10,
    marginTop: 2
  },
  buttonIcon: {
    textAlign: 'center',
    height: 20
  }
});

export default NavigationBar;
