import React, { createContext, useState } from 'react';

const ProgramContext = createContext();

const ProgramContextProvider = props => {
  const [allShows, setAllShows] = useState([]);
  const [filter, setFilter] = useState({
    selectedCategories: [],
    selectedAudience: [],
    selectedDate: [],
    selectedFavoriteOptions: []
  });
  const [favorites, setFavorites] = useState(new Set());

  return (
    <ProgramContext.Provider
      value={{ allShows, setAllShows, filter, setFilter, favorites, setFavorites }}
    >
      {props.children}
    </ProgramContext.Provider>
  );
};

export { ProgramContext, ProgramContextProvider };
