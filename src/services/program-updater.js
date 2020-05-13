import React, { useEffect, useContext } from 'react';
import { View } from 'react-native';
import BackendService from './backend-service';
import { ProgramContext } from './program-context';

const ProgramUpdater = () => {
  const { setAllShows } = useContext(ProgramContext);

  useEffect(() => {
    function updateProgram() {
      BackendService.fetchProgram().then(function(response) {
        setAllShows(response['program']);
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
