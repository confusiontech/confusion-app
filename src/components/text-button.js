import React from 'react';
import { StyleSheet, Text } from 'react-native';
import StandardButton from './standard-button';
import { BUTTON_TEXT_COLOR } from '../styles/colors';
import { iconsMap } from '../helpers/icon-helpers';

const TextButton = ({
  textStyle = {},
  text,
  iconKey,
  ...props
}) => {
  return (
    <StandardButton {...props}>
      <Text style={{ ...styles.text, ...textStyle }}>{iconsMap.get(iconKey, iconProps)} {text}</Text>
    </StandardButton>
  );
};

const iconProps = { color: BUTTON_TEXT_COLOR, size: 16 };

const styles = StyleSheet.create({
  text: {
    color: BUTTON_TEXT_COLOR,
    fontWeight: 'bold',
    letterSpacing: 0.5
  }
});

export default TextButton;
