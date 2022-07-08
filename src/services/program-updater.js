import React, { useEffect, useContext } from 'react';
import { View } from 'react-native';
import backendService from './backend-service';
import { ProgramContext } from './program-context';
import { withAsyncStorage, Storage, PROGRAM_STORAGE_KEY, FAVORITES_STORAGE_KEY } from '../helpers/with-async-storage';
import { programAdapter } from '../helpers/program-helpers';

const ProgramUpdater = () => {
  const { setAllShows, allShows, setFavorites } = useContext(ProgramContext);
  const fetchProgram = withAsyncStorage(PROGRAM_STORAGE_KEY, async () => {
    const response = await backendService.fetchProgram();
    programAdapter(response.program);
    return response;
  });

  useEffect(() => {
    function hasProgram() {
      return allShows && allShows.length;
    }

    const initialiseProgramData = async () => {
      try {
        const storedFavorites = await Storage.get(FAVORITES_STORAGE_KEY);
        if (storedFavorites) {
          setFavorites(new Set(storedFavorites));
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const programResponse = await fetchProgram.getCachedValue();
        if (programResponse && !hasProgram()) {
          setAllShows(programResponse.program);
        }
      } catch (error) {
        console.error(error);
      }
    };

    initialiseProgramData();

    function updateProgram() {
      fetchProgram().then(function(response) {
        if (!hasProgram() || response.new) {
          setAllShows(response.program);
        }
      });
    }

    updateProgram();

    const taskId = setInterval(() => {
      updateProgram();
    }, 600000);

    return () => {
      clearInterval(taskId);
    };
  }, []);

  return (
    <View />
  );
};

export default ProgramUpdater;
