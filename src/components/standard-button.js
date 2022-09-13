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
        variant='ghost'
        onPress={onPress}
        style={{
          ...styles.button,
          ...buttonStyle
        }}
        px='1'
      >
        {children}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: BUTTON_COLOR,
    width: '100%'
  },
  button: {
    justifyContent: 'center'
  }
});

export default StandardButton;
