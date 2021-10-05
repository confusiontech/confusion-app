import React from 'react';
import { Text, View } from 'react-native';
import ShowList from './show-list';
import { getNow } from '../helpers/program-helpers';

const TEN_MINUTES = 10 * 60 * 1000;

const Program = ({ navigation, shows, goToNowEvent, isFilterActive }) => {
  // TODO: Avoid new function on every call, it breaks equality checks which causes additional re-renders
  const flatListRef = React.createRef();

  goToNowEvent.current = () => {
    if (shows.length > 0) {
      const now = getNow();
      let nowIndex = shows.findIndex(show => show.time[0] > now - TEN_MINUTES);
      nowIndex = Math.max(0, nowIndex);

      return flatListRef.current.scrollToIndex({ index: nowIndex, viewPosition: 0 });
    } else {
      return false;
    }
  };

  const program = (
    <View style={{ height: '92%' }}>
      <ShowList
        flatListRef={flatListRef}
        shows={shows}
        navigation={navigation}
      />
    </View>
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
