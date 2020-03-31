const programMock = require('../mocks/program-mock.json');
import React, { useState } from 'react';
import Program from '../components/program';
import CategoryFilter from '../components/category-filter';

const ProgramContainer = () => {
  const [shows, setShows] = useState(programMock.program);

  const onCategoryFilterClick = (selectedCategory) => {
    const filterdShows = shows.filter( show => 
      show.participant_category == selectedCategory
    );
    setShows(filterdShows);
  };

  return (
    <div>
      <CategoryFilter onOptionClick={onCategoryFilterClick} />
      <Program shows={shows}/>
    </div>
  )
}

export default ProgramContainer;