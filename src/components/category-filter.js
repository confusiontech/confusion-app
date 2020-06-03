import React, { useState } from 'react';
import { Picker } from 'native-base';
import categoryService from '../services/category-service';

export default function CategoryFilter({onOptionClick}) {
  const [selectedValue, setSelectedValue] = useState("");
  return (
    <Picker
      style={{ width: undefined }}
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
