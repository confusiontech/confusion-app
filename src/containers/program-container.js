import React, { useState, useEffect,useRef } from 'react';
import Program from '../components/program';
import CategoryFilter from '../components/category-filter';
import { View } from 'react-native';

import { Platform } from 'react-native';


const ProgramContainer = () => {
  const [shows, setShows] = useState([]);
  const allShows = useRef([]);
  
  useEffect(() => {    
    async function fetchData() {
      console.log('fetching')
      const cors_url = 'https://cors-anywhere.herokuapp.com/'
      const orfheo_url = 'https://www.orfheo.org/search/results_program'
      const request_url = Platform.OS === 'web' ? `${cors_url}${orfheo_url}` : orfheo_url
      try {
        let response = await fetch(request_url, {          
          method: "POST",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          body: "event_id=3cb8e68a-b03f-4a7d-b714-42a7ca56870a&date=&lang=es"    
        });

        let responseJson = await response.json();
        allShows.current = responseJson['program'];
        setShows(responseJson['program']);
      } catch (error) {
        console.error(error);
      }
    }
    if (allShows.current.length == 0) fetchData();
  });

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
