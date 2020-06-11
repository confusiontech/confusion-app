import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';

import Program from '../components/program';
import CategoryFilter from '../components/category-filter';
import { ProgramContext } from '../services/program-context';

import categoryService from '../services/category-service';

const categories = [
  {
    label: 'Todas',
    value: null,
    key: null
  },
  ...categoryService.getAllCategories().map( category => {
    return {
      label: category.name,
      value: category.id,
      key: category.id
    }
  })
]

const dates = [
  {
    label: 'Todos',
    value: null,
    key: null
  },
  ...categoryService.getDates().map( date => {
    return {
      label: date,
      value: date,
      key: date
    }
  })
]

const ProgramContainer = () => {
  const { allShows } = useContext(ProgramContext);
  const [shows, setShows] = useState(allShows);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    let isShowSelected = show => true; 
    if (selectedCategory) {
      isShowSelected = show => show.participant_category == selectedCategory
    }
    if (selectedDate) {
      isShowSelected = show => show.date == selectedDate && isShowSelected(show)
    }
    const filteredShows = allShows
    setShows(filteredShows);
  }, [allShows, selectedCategory, selectedDate]);

  return (
    <View>
      <CategoryFilter 
        selectedElement={selectedCategory}
        setSelectedElement={setSelectedCategory}
        elements={categories}
      />
      <CategoryFilter 
        selectedElement={selectedDate}
        setSelectedElement={setSelectedDate}
        elements={dates}
      />
      <Program shows={shows}/>
    </View>
  );
};

export default ProgramContainer;
