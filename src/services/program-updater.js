import React, { useEffect, useContext } from 'react';
import { View } from 'react-native';
import backendService from './backend-service';
import { ProgramContext } from './program-context';
import { withAsyncStorage, Storage, PROGRAM_STORAGE_KEY, FAVORITES_STORAGE_KEY } from '../helpers/with-async-storage';
import { programAdapter } from '../helpers/program-helpers';

const UPDATE_INTERVALL_IN_MILLISEC = 600000; // 600000 == 10 minutes

const ProgramUpdater = () => {
  const { setAllShows, allShows, setFavorites } = useContext(ProgramContext);
  const fetchProgram = withAsyncStorage(PROGRAM_STORAGE_KEY, async (storedValue) => {
    const response = await backendService.fetchProgram(storedValue);
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
        if (!hasProgram() || !!response.new) {
          setAllShows(response.program);
        }
      });
    }

    updateProgram();

    const taskId = setInterval(() => {
      updateProgram();
    }, UPDATE_INTERVALL_IN_MILLISEC);

    return () => {
      clearInterval(taskId);
    };
  }, []);

  return (
    <View />
  );
};

export default ProgramUpdater;
