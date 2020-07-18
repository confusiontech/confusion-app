import React, { useState, useEffect, useContext } from 'react';
import { View, Button } from 'react-native';

import PickerFilter from '../components/picker-filter';
import FilterGrid from '../components/filter-grid';
import { ProgramContext } from '../services/program-context';
import { categories, dates } from '../helpers/program-helpers';

const FilterContainer = ({ navigation }) => {
  const { setFilter, filter } = useContext(ProgramContext);

  const [selectedCategories, setSelectedCategories] = useState(filter.selectedCategories);
  const [selectedDate, setSelectedDate] = useState(filter.selectedDate);

  return (
    <View>
      <FilterGrid 
        selectedElementIds={selectedCategories}
        setSelectedElementIds={setSelectedCategories}
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
            selectedCategories,
            selectedDate
          });
          navigation.navigate('Programa');
        }}
      />
    </View>
  );
};

export default FilterContainer;
