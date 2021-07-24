import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'native-base';

import { BUTTON_COLOR } from '../styles/colors';

const StandardButton = ({
  buttonContainerStyle,
  buttonStyle,
  onPress,
  children
}) => {
  return (
    <View style={{
      ...styles.buttonContainer,
      ...buttonContainerStyle
    }}
    >
      <Button
        transparent
        onPress={onPress}
        style={{
          ...styles.button,
          ...buttonStyle
        }}
      >
        {children}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: BUTTON_COLOR,
    borderWidth: 1,
    width: '100%'
  },
  button: {
    justifyContent: 'center'
  },
  favoritesText: {}
});

export default StandardButton;
