import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import ShowList from './show-list';
import { getNow, findCurrentShowIndex } from '../helpers/program-helpers';

const Program = ({ navigation, shows, goToNowEvent, isFilterActive }) => {
  const [nowDt, setNowDt] = useState(null);

  // Actualizamos la hora actual cada un minuto, que es suficiente
  // resolución para cualquier operación sobre las actividades del
  // programa. Así evitamos redraws innecesarios
  const UPDATE_INTERVAL_MS = 60000;

  const toDateTimeByInterval = (dt) => {
    return dt - dt % UPDATE_INTERVAL_MS;
  };

  useEffect(() => {
    setNowDt(toDateTimeByInterval(getNow()));

    const taskId = setInterval(() => {
      setNowDt(toDateTimeByInterval(getNow()));
    }, UPDATE_INTERVAL_MS);

    return () => {
      clearInterval(taskId);
    };
  }, [shows]);

  // TODO: Avoid new function on every call, it breaks equality checks which causes additional re-renders
  const flatListRef = React.createRef();

  goToNowEvent.current = () => {
    const nowIndex = findCurrentShowIndex(shows, nowDt);

    if (nowIndex >= 0) {
      return flatListRef.current.scrollToIndex({ index: nowIndex, viewPosition: 0 });
    } else {
      return false;
    }
  };

  const program = (
    <ShowList
      nowDt={nowDt}
      flatListRef={flatListRef}
      shows={shows}
      navigation={navigation}
    />
  );

  const noResults = (
    <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 16 }}>
      Ningún resultado
    </Text>
  );

  return (
    <View>
      {(!shows.length && isFilterActive) ? noResults : program}
    </View>
  );
};

export default Program;
