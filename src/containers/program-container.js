import React, { useState, useEffect } from 'react';
import Program from '../components/program';
import CategoryFilter from '../components/category-filter';
import { View } from 'react-native';

const ProgramContainer = () => {
  const [shows, setShows] = useState([]);
  let allShows = [];
  
  useEffect(() => {
    async function fetchData() {
      try {
        let response = await fetch('https://www.orfheo.org/search/results_program', {          
          method: "POST",
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          body: "event_id=3cb8e68a-b03f-4a7d-b714-42a7ca56870a&date=&lang=es"    
        });

        let responseJson = await response.json();
        allShows = responseJson['program'];
        setShows(allShows);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  });

  const onCategoryFilterClick = (selectedCategory) => {
    if (selectedCategory) {
      const filterdShows = allShows.filter( show => 
        show.participant_category == selectedCategory
      );
      setShows(filterdShows);
    } else {
      setShows(allShows);
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
