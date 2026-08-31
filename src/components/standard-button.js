import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

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
        mode='text'
        onPress={onPress}
        contentStyle={{
          ...styles.button,
          ...buttonStyle
        }}
        labelStyle={styles.buttonLabel}
        uppercase={false}
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
  },
  buttonLabel: {
    textTransform: 'none'
  }
});

export default StandardButton;
