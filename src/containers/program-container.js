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

const ProgramContainer = () => {
  const { allShows } = useContext(ProgramContext);
  const [shows, setShows] = useState(allShows);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (selectedCategory) {
      const filteredShows = allShows.filter( show => 
        show.participant_category == selectedCategory
      );
      setShows(filteredShows);
    } else {
      setShows(allShows);
    }
  }, [allShows, selectedCategory]);


  return (
    <View>
      <CategoryFilter 
        selectedElement={selectedCategory}
        setSelectedElement={setSelectedCategory}
        elements={categories}
      />
      <Program shows={shows}/>
    </View>
  );
};

export default ProgramContainer;
