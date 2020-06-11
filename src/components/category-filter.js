import React, { useState } from 'react';
import { Picker } from 'native-base';

export default function CategoryFilter({ elements, selectedElement, setSelectedElement }) {
  return (
    <Picker
      style={{ width: undefined }}
      selectedValue={selectedElement}
      onValueChange={(itemValue) => setSelectedElement(itemValue)}
    >
      {elements.map(item =>
        <Picker.Item label={item.label} value={item.value} key={item.key} />
      )}
    </Picker>
  );
}
