import React, { useState } from 'react';
import { Picker } from 'react-native';

export default function CategoryFilter({onOptionClick}) {
  const [selectedValue, setSelectedValue] = useState("");
  return (
    <Picker
      style={{ marginTop: 100, height: 50, width: 150 }}
      selectedValue={selectedValue}
      onValueChange={(itemValue) => {
          setSelectedValue(itemValue);
          onOptionClick(itemValue);
      }}
    >
      <Picker.Item label="All" value="" />
      <Picker.Item label="Health" value="health" />
      <Picker.Item label="Music" value="music" />
    </Picker>
  );
}
