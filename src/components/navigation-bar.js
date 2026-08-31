import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { iconsMap } from '../helpers/icon-helpers';

import {
  BUTTON_TEXT_COLOR,
  BUTTON_ACTIVE_TEXT_COLOR,
  BUTTON_COLOR,
  BUTTON_ACTIVE_COLOR
} from '../styles/colors';

import { useRoute } from '@react-navigation/native';

const NAV_BUTTON_WIDTH = '20%';

const NavigationBar = ({ navigation }) => {
  const route = useRoute();

  const iconProps = { color: BUTTON_TEXT_COLOR, size: 18 };

  const NavButton = ({ routeName, buttonTitle, iconName }) => {
    const isActive = route.name === routeName;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(routeName)}
        style={[
          styles.buttonContainer,
          isActive ? styles.selectedButtonContainer : styles.bottomButtonContainer
        ]}
      >
        <Text style={[styles.buttonIcon, { color: isActive ? BUTTON_ACTIVE_TEXT_COLOR : BUTTON_TEXT_COLOR }]}>
          {iconsMap.get(iconName, {
            ...iconProps,
            color: isActive ? BUTTON_ACTIVE_TEXT_COLOR : BUTTON_TEXT_COLOR
          })}
        </Text>
        <Text style={[
          styles.buttonText,
          { color: isActive ? BUTTON_ACTIVE_TEXT_COLOR : BUTTON_TEXT_COLOR }
        ]}
        >
          {buttonTitle}
        </Text>
      </TouchableOpacity>
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

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%'
  },
  buttonContainer: {
    width: NAV_BUTTON_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9
  },
  bottomButtonContainer: {
    backgroundColor: BUTTON_COLOR
  },
  selectedButtonContainer: {
    backgroundColor: BUTTON_ACTIVE_COLOR
  },
  buttonText: {
    fontWeight: 'bold',
    letterSpacing: 0.5,
    fontSize: 12,
    marginTop: 2
  },
  buttonIcon: {
    textAlign: 'center',
    height: 20
  }
});

export default NavigationBar;
