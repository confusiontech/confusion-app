import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import FilterGrid from '../components/filter-grid';
import { ProgramContext } from '../services/program-context';
import { categories, dates, audiences } from '../helpers/program-helpers';
import { iconsMap } from '../helpers/icon-helpers';
import TextButton from '../components/text-button';
import { HeaderBackButton } from '@react-navigation/stack';

const FilterContainer = ({ navigation }) => {
  const { setFilter, filter } = useContext(ProgramContext);

  const [selectedCategories, setSelectedCategories] = useState(filter.selectedCategories);
  const [selectedAudience, setSelectedAudience] = useState(filter.selectedAudience);
  const [selectedDate, setSelectedDate] = useState(filter.selectedDate);

  const setFilterChangesAndNavigate = () => {
    setFilter({
      ...filter,
      selectedCategories,
      selectedAudience,
      selectedDate
    });
    navigation.navigate('Programa');
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: (props) => (
        <HeaderBackButton
          {...props}
          onPress={setFilterChangesAndNavigate}
        />
      )
    });
  });

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
    <View style={{ flex: 1 }}>
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
          buttonsPerRow={5}
        />
        <FilterGrid
          selectedElementIds={selectedDate}
          setSelectedElementIds={setSelectedDate}
          elements={dates}
          contentStyle={{ text: { textTransform: 'capitalize' } }}
          buttonsPerRow={2}
        />
      </View>
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
        <TextButton
          iconKey='search'
          text='Ver'
          onPress={setFilterChangesAndNavigate}
        />
      </View>
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