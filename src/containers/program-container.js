import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';

import Program from '../components/program';
import PickerFilter from '../components/picker-filter';
import { ProgramContext } from '../services/program-context';

import { filterShows, categories, dates } from '../helpers/program-helpers'


const ProgramContainer = () => {
  const { allShows } = useContext(ProgramContext);
  const [shows, setShows] = useState(allShows);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');

  const propertiesConditions = [
    {
      showProperty: 'participant_category',
      stateProperty: selectedCategory
    },
    {
      showProperty: 'date',
      stateProperty: selectedDate
    }
  ]
  
  useEffect(() => {
    const filteredShows = filterShows(allShows, propertiesConditions);
    setShows(filteredShows);
  }, [allShows, selectedCategory, selectedDate]);


  return (
    <View>
      <PickerFilter 
        selectedElement={selectedCategory}
        setSelectedElement={setSelectedCategory}
        elements={categories}
      />
      <PickerFilter 
        selectedElement={selectedDate}
        setSelectedElement={setSelectedDate}
        elements={dates}
      />
      <Program shows={shows}/>
    </View>
  );
};

export default ProgramContainer;
