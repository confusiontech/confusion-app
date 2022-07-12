import React, { useContext } from 'react';
import { View, StyleSheet, Text, Linking, SafeAreaView, FlatList } from 'react-native';

import SpaceItem from '../components/space-item';
import { ProgramContext } from '../services/program-context';
import { getSpaceList } from '../helpers/program-helpers';
import { getMapAppLink } from '../helpers/link-helpers';
import StandardButton from '../components/standard-button';
import MapButton from '../components/map-button';

import {
  BUTTON_TEXT_COLOR
} from '../styles/colors';

const ROW_HEIGHT = 80;

const SpaceListContainer = ({ navigation }) => {
  const { allShows } = useContext(ProgramContext);

  const spaces = getSpaceList(allShows);

  const extractKey = item => (item.order + 1 + item.host_name).replace(' ', '');
  const renderItem = ({ item }) => <SpaceItem navigation={navigation} space={item} />;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: '92%' }}>
        <SafeAreaView>
          <FlatList
            data={spaces}
            renderItem={renderItem}
            keyExtractor={extractKey}
            getItemLayout={(_show, index) => ({
              offset: ROW_HEIGHT * index,
              length: ROW_HEIGHT,
              index
            })}
          />
        </SafeAreaView>
      </View>
      <View style={{ height: '8%' }}>
        <MapButton
          navigation={navigation}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default SpaceListContainer;
