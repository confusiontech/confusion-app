import React, { useState, useEffect, useContext } from 'react';
import { View, Button } from 'react-native';

import PickerFilter from '../components/picker-filter';
import { ProgramContext } from '../services/program-context';
import { categories, dates } from '../helpers/program-helpers';

const FilterContainer = ({ navigation }) => {
  const { setFilter, filter } = useContext(ProgramContext);

  const [selectedCategory, setSelectedCategory] = useState(filter.selectedCategory);
  const [selectedDate, setSelectedDate] = useState(filter.selectedDate);

  return (
    <View>
      <PickerFilter 
        selectedElement={selectedCategory}
        setSelectedElement={setSelectedCategory}
        elements={categories}
      />
      <PickerFilter 
        selectedElement={selectedDate}
        setSelectedElement={setSelectedDate}
        elements={dates}
      />
      <Button
        title="Search"
        onPress={() => {
          setFilter({
            selectedCategory,
            selectedDate
          });
          navigation.navigate('Programa');
        }}
      />
    </View>
  );
};

export default FilterContainer;
