import React from 'react';
import { Picker } from 'react-native';

export default function CategoryFilter({onOptionClick}) {
  return (
    <Picker
      style={{ height: 50, width: 150 }}
      selectedValue={"health"}
      onValueChange={(itemValue) => onOptionClick(itemValue)}
    >
      <Picker.Item label="Health" value="health" />
      <Picker.Item label="Music" value="music" />
    </Picker>
  );
}