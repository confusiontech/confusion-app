import React from 'react';
import { Picker } from 'native-base';

export default function PickerFilter({ elements, selectedElement, setSelectedElement }) {
  const setElementState = itemValue => setSelectedElement(itemValue);
  const pickerItems = elements.map(item =>
    <Picker.Item label={item.label} value={item.value} key={item.key} />
  );
  return (
    <Picker
      style={{ width: undefined }}
      selectedValue={selectedElement}
      onValueChange={setElementState}
    >
      {pickerItems}
    </Picker>
  );
}
