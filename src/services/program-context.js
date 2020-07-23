import React, { createContext, useState } from 'react';

const ProgramContext = createContext();

const ProgramContextProvider = props => {
  const [allShows, setAllShows] = useState([]);
  const [filter, setFilter] = useState({
    selectedCategories: [],
    selectedAudience: [],
    selectedDate: [],
  });
  
  return (
    <ProgramContext.Provider value={{ allShows, setAllShows, filter, setFilter }}>
      {props.children}
    </ProgramContext.Provider>
  );
};

export { ProgramContext, ProgramContextProvider };
