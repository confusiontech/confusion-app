import React, { useState, useEffect, useContext } from 'react';
import { View, Button, Text } from 'react-native';

import PickerFilter from '../components/picker-filter';
import FilterGrid from '../components/filter-grid';
import { ProgramContext } from '../services/program-context';
import { categories, dates, audiences } from '../helpers/program-helpers';
import { iconsMap } from '../helpers/icon-helpers';

const FilterContainer = ({ navigation }) => {
  const { setFilter, filter } = useContext(ProgramContext);

  const [selectedCategories, setSelectedCategories] = useState(filter.selectedCategories);
  const [selectedAudience, setSelectedAudience] = useState(filter.selectedAudience);
  const [selectedDate, setSelectedDate] = useState(filter.selectedDate);

  return (
    <View>
      <FilterGrid 
        selectedElementIds={selectedCategories}
        setSelectedElementIds={setSelectedCategories}
        elements={categories}
      />
      <FilterGrid 
        selectedElementIds={selectedAudience}
        setSelectedElementIds={setSelectedAudience}
        elements={audiences}
      />
      <FilterGrid 
        selectedElementIds={selectedDate}
        setSelectedElementIds={setSelectedDate}
        elements={dates}
      />
      <Button
        title="Search"
        onPress={() => {
          setFilter({
            selectedCategories,
            selectedAudience,
            selectedDate,
          });
          navigation.navigate('Programa');
        }}
      />
    </View>
  );
};

export default FilterContainer;
