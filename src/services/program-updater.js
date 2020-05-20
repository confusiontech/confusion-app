import React, { useEffect, useContext } from 'react';
import { View } from 'react-native';
import backendService from './backend-service';
import { ProgramContext } from './program-context';
import withAsyncStorage from '../helpers/with-async-storage';

const PROGRAM_CACHED_KEY = '@ConfusionApp:program';

const ProgramUpdater = () => {
  const { setAllShows, allShows } = useContext(ProgramContext);
  const fetchProgram = withAsyncStorage(PROGRAM_CACHED_KEY, backendService.fetchProgram);

  useEffect(() => {
    function updateProgram() {
      fetchProgram().then(function(response) {
        if (!allShows || response.new) setAllShows(response.program);
      });
    }

    updateProgram();

    const taskId = setInterval(() => {
      updateProgram();
    }, 10000);

    return () => {
      clearInterval(taskId);
    };

  }, []);

  return (
      <View/>
  );
};

export default ProgramUpdater;
