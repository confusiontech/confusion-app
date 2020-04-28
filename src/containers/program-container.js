import React, { useState, useEffect,useRef } from 'react';
import Program from '../components/program';
import CategoryFilter from '../components/category-filter';
import BackendService from '../services/backend-service';
import { View } from 'react-native';

import { Platform } from 'react-native';


const ProgramContainer = () => {
  const [shows, setShows] = useState([]);
  const allShows = useRef([]);
  
  useEffect(() => {
    BackendService.fetchProgram().then(function(response) {
      allShows.current = response['program'];
      setShows(response['program']);
    });
  }, []);

  const onCategoryFilterClick = (selectedCategory) => {
    if (selectedCategory) {
      const filteredShows = allShows.current.filter( show => 
        show.participant_category == selectedCategory
      );
      setShows(filteredShows);
    } else {
      setShows(allShows.current);
    }
  };

  return (
    <View>
      <CategoryFilter onOptionClick={onCategoryFilterClick} />
      <Program shows={shows}/>
    </View>
  );
};

export default ProgramContainer;
