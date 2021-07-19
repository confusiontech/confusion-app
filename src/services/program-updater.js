import React, { useEffect, useContext } from 'react';
import { View } from 'react-native';
import backendService from './backend-service';
import { ProgramContext } from './program-context';
import { withAsyncStorage, Storage, PROGRAM_STORAGE_KEY, FAVORITES_STORAGE_KEY } from '../helpers/with-async-storage';

const ProgramUpdater = () => {
  const { setAllShows, allShows, setFavorites } = useContext(ProgramContext);
  const fetchProgram = withAsyncStorage(PROGRAM_STORAGE_KEY, backendService.fetchProgram);

  useEffect(() => {
    Storage.get(FAVORITES_STORAGE_KEY).then(storedFavorites => {
      if (storedFavorites) setFavorites(new Set(storedFavorites));
    });

    function updateProgram() {
      fetchProgram().then(function(response) {
        if (!(allShows && allShows.length) || response.new) setAllShows(response.program);
      });
    }

    updateProgram();

    const taskId = setInterval(() => {
      updateProgram();
    }, 60000);

    return () => {
      clearInterval(taskId);
    };
  }, []);

  return (
    <View />
  );
};

export default ProgramUpdater;
