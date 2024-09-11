import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { getSpaceList } from '../helpers/program-helpers';

import { ProgramContext } from '../services/program-context';
import {
  SPACE_NUMBER_CIRCLE_COLOR,
  SPACE_NUMBER_TEXT_COLOR
} from '../styles/colors';

import PageLayout from './page-layout';

const MAP_VIEW_DELTA = 0.0105;
const MAP_CENTER_LATITUDE = 39.488882;
const MAP_CENTER_LONGITUDE = -0.359420;

const MapContainer = ({ navigation }) => {
  const { allShows } = useContext(ProgramContext);

  const spaces = getSpaceList(allShows);

  return (
    <PageLayout navigation={navigation}>
      <View>
        <Text style={styles.initialText}>
          Pincha el marcador de un espacio para ver su programación
        </Text>
        <MapView
          style={styles.mapStyle}
          provider={PROVIDER_DEFAULT}
          showsUserLocation
          initialRegion={{
            latitude: MAP_CENTER_LATITUDE,
            longitude: MAP_CENTER_LONGITUDE,
            latitudeDelta: MAP_VIEW_DELTA,
            longitudeDelta: MAP_VIEW_DELTA
          }}
        >
          {
        spaces.map(space => {
          return (
            <MapMarker
              navigation={navigation}
              space={space}
              key={space.address.location.lat + space.address.location.lng + space.order}
            />
          );
        })
        }
        </MapView>
      </View>
    </PageLayout>
  );
};

const MapMarker = ({ navigation, space }) => {
  const latitude = parseFloat(space.address.location.lat);
  const longitude = parseFloat(space.address.location.lng);

  const openSpaceProgram = () => navigation.navigate('ProgramaEspacio', { space });

  return (
    <View>
      <Marker
        coordinate={{ latitude, longitude }}
        onPress={openSpaceProgram}
        anchor={{ x: 0.5, y: 0.5 }}
      >
        <View style={styles.marker}>
          <Text style={styles.markerText}>
            {`${parseInt(space.order) + 1}`}
          </Text>
        </View>
      </Marker>
    </View>
  );
};

const spaceNumberContainer = {
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: SPACE_NUMBER_CIRCLE_COLOR
};

const spaceNumber = {
  textAlign: 'center',
  color: SPACE_NUMBER_TEXT_COLOR
};

const styles = StyleSheet.create({
  mapStyle: {
    width: '100%',
    height: '100%'
  },
  marker: {
    ...spaceNumberContainer,
    width: 24,
    height: 24,
    borderRadius: 17
  },
  markerText: {
    ...spaceNumber,
    fontSize: 14
  },
  initialText: {
    fontWeight: 'bold',
    position: 'absolute',
    top: 4,
    left: 4,
    zIndex: 9,
    fontSize: 16,
    textAlign: 'left',
    width: '65%',
    backgroundColor: 'rgba(255,255,255,0.6)',
    padding: 4
  }
});

export default MapContainer;
