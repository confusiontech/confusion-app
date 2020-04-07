import React, { useState } from 'react';
import { Picker } from 'react-native';
import categoryService from '../services/category-service';

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
    <Picker.Item label="Todas" value="" key="" />    
    {categoryService.getAllCategories().map(item =>
      <Picker.Item label={item.name} value={item.id} key={item.id} />
    )}
    </Picker>
  );
}
