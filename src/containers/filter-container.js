import React, { useState, useContext, useEffect } from 'react';
import { View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import FilterGrid from '../components/filter-grid';
import { ProgramContext } from '../services/program-context';
import { categories, dates, audiences } from '../helpers/program-helpers';
import TextButton from '../components/text-button';
import { HeaderBackButton } from '@react-navigation/stack';
import { BUTTON_COLOR } from '../styles/colors';

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

  useEffect(() => {
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

  return (
    <View style={{ flex: 1 }}>
      <View>
        <FilterGrid
          selectedElementIds={selectedCategories}
          setSelectedElementIds={setSelectedCategories}
          elements={[...categories]}
          withIcon
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
      <SafeAreaView
        edges={['bottom']}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: BUTTON_COLOR }}
      >
        <TextButton
          iconKey='search'
          text='Ver'
          onPress={setFilterChangesAndNavigate}
        />
      </SafeAreaView>
    </View>
  );
};

export default FilterContainer;
