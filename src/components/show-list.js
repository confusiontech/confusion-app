
import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';

import ProgramItem from './program-item';

const ROW_HEIGHT = 80;

const ShowList = ({ shows, flatListRef, navigation, nowDt }) => {
  const extractKey = item => item.id + item.time[0];
  const renderItem = ({ item }) => <ProgramItem navigation={navigation} show={item} nowDt={nowDt} />;

  return (
    <SafeAreaView>
      <FlatList
        data={shows}
        renderItem={renderItem}
        keyExtractor={extractKey}
        ref={flatListRef}
        getItemLayout={(_show, index) => ({
          offset: ROW_HEIGHT * index,
          length: ROW_HEIGHT,
          index
        })}
      />
    </SafeAreaView>
  );
};

export default ShowList;
