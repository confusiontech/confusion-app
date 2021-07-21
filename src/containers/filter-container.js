import React, { useState, useContext } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

import FilterGrid from '../components/filter-grid';
import { ProgramContext } from '../services/program-context';
import { categories, dates, audiences } from '../helpers/program-helpers';
import { iconsMap } from '../helpers/icon-helpers';

const FilterContainer = ({ navigation }) => {
  const { setFilter, filter } = useContext(ProgramContext);

  const [selectedCategories, setSelectedCategories] = useState(filter.selectedCategories);
  const [selectedAudience, setSelectedAudience] = useState(filter.selectedAudience);
  const [selectedDate, setSelectedDate] = useState(filter.selectedDate);

  const props = { size: 16, color: 'black', styleClass: styles.icon };

  const categoriesWithIcon = categories.map(category => (
    {
      ...category,
      label: (
        <Text>
          {iconsMap.get(category.value, props)}
          {'\n'}
          {category.label}
        </Text>
      )
    }
  ));

  return (
    <View>
      <FilterGrid
        selectedElementIds={selectedCategories}
        setSelectedElementIds={setSelectedCategories}
        elements={categoriesWithIcon}
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
        contentStyle={{ text: { textTransform: 'capitalize' } }}
      />
      <Button
        title='Ver'
        onPress={() => {
          setFilter({
            ...filter,
            selectedCategories,
            selectedAudience,
            selectedDate
          });
          navigation.navigate('Programa');
        }}
      />
    </View>
  );
};

export default FilterContainer;

// TODO: Copied and pasted from project.js, refactor
const styles = StyleSheet.create({
  icon: {
    textAlign: 'center'
  }
});
