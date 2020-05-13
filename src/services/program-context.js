import React, { createContext, useState } from 'react';

const ProgramContext = createContext();

const ProgramContextProvider = props => {
  const [allShows, setAllShows] = useState([]);
  
  return (
    <ProgramContext.Provider value={{ allShows, setAllShows }}>
      {props.children}
    </ProgramContext.Provider>
  );
};

export { ProgramContext, ProgramContextProvider };
