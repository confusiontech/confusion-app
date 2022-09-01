import React, { useContext } from 'react';
import { View, StyleSheet, Text, Linking } from 'react-native';

import ShowList from '../components/show-list';
import { ProgramContext } from '../services/program-context';
import { filterShows } from '../helpers/program-helpers';
import { iconsMap } from '../helpers/icon-helpers';
import { getMapAppLink } from '../helpers/link-helpers';
import StandardButton from '../components/standard-button';

import {
  BUTTON_TEXT_COLOR
} from '../styles/colors';

import PageLayout from './page-layout';

const SpaceProgramContainer = ({ navigation, route }) => {
  const { favorites, allShows } = useContext(ProgramContext);
  const space = route.params.space;

  const spaceName = `${route.params.space.order + 1} - ${route.params.space.host_name}`;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: spaceName
      // headerLeft: () => iconsMap.get('favorites')
    });
  }, [navigation, spaceName]);

  const propertiesConditions = [
    {
      // `order` es el ID numérico del espacio
      showProperty: 'order',
      stateProperty: [space.order]
    }
  ];

  const selectedShows = filterShows(
    allShows,
    favorites,
    propertiesConditions
  );

  const flatListRef = React.createRef();

  const mapLink = getMapAppLink(space.address.location.lat, space.address.location.lng);

  const goButton = (
    <View style={styles.buttonsContainer}>
      <StandardButton
        onPress={() => Linking.openURL(mapLink)}
        buttonContainerStyle={{ ...styles.goButtonContainer }}
      >
        <Text style={styles.buttonText}>
          {iconsMap.get('directions', { color: BUTTON_TEXT_COLOR, size: 16 })} Cómo llegar
        </Text>
      </StandardButton>
    </View>
  );

  const program = (
    <View>
      <ShowList
        flatListRef={flatListRef}
        shows={selectedShows}
        navigation={navigation}
      />
    </View>
  );

  const noResults = (
    <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 16 }}>
      Este espacio no tiene actividad
    </Text>
  );

  return (
    <PageLayout navigation={navigation}>
      <View>
        {goButton}
        {(!selectedShows.length) ? noResults : program}
      </View>
    </PageLayout>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row'
  },
  goButtonContainer: {
    width: '100%'
  },
  buttonText: {
    color: BUTTON_TEXT_COLOR,
    fontWeight: 'bold',
    letterSpacing: 0.5
  }
});

export default SpaceProgramContainer;
