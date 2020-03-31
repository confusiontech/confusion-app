import React from 'react';
import Picker from 'react-native';

export default function CategoryFilter({onOptionClick}) {
  return (
    <Picker
      // selectedValue={"health"}
      onValueChange={(itemValue) => onOptionClick(itemValue)}
    >
      <Picker.Item label="Health" value="health" />
      <Picker.Item label="Music" value="music" />
    </Picker>
  );
}