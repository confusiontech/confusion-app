import React, { useContext } from 'react';
import { SafeAreaView, FlatList } from 'react-native';

import SpaceItem from '../components/space-item';
import { ProgramContext } from '../services/program-context';
import { getSpaceList } from '../helpers/program-helpers';
import PageLayout from './page-layout';

const ROW_HEIGHT = 80;

const SpaceListContainer = ({ navigation }) => {
  const { allShows } = useContext(ProgramContext);

  const spaces = getSpaceList(allShows);

  const extractKey = item => (item.order + 1 + item.host_name).replace(' ', '');
  const renderItem = ({ item }) => <SpaceItem navigation={navigation} space={item} />;

  return (
    <PageLayout navigation={navigation}>
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
    </PageLayout>
  );
};

export default SpaceListContainer;
