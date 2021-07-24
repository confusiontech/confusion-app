import React from 'react';
import { StyleSheet, Text } from 'react-native';
import StandardButton from './standard-button';

const TextButton = ({
  textStyle,
  text,
  ...props
}) => {
  return (
    <StandardButton {...props}>
      <Text style={{ ...styles.text, textStyle }}> {text} </Text>
    </StandardButton>
  );
};

const styles = StyleSheet.create({
  text: {}
});

export default TextButton;
