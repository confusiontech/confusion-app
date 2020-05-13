import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';

import Program from '../components/program';
import CategoryFilter from '../components/category-filter';
import { ProgramContext } from '../services/program-context';

const ProgramContainer = () => {
  const { allShows } = useContext(ProgramContext);
  const [shows, setShows] = useState(allShows);
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  const onCategoryFilterClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <View>
      <CategoryFilter onOptionClick={onCategoryFilterClick} />
      <Program shows={shows}/>
    </View>
  );
};

export default ProgramContainer;
