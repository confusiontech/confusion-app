import React, { useContext } from 'react';
import { View, StyleSheet, Text, Linking } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';

import { ProgramContext } from '../services/program-context';
import {
  LINK_COLOR,
  BUTTON_TEXT_COLOR
} from '../styles/colors';

const EXTERNAL_MAP_ZOOM = 15;
const MAP_VIEW_DELTA = 0.0092;
const MAP_CENTER_LATITUDE = 39.487282;
const MAP_CENTER_LONGITUDE = -0.358120;

const MapContainer = ({ navigation }) => {
  const { allShows } = useContext(ProgramContext);

  const spaces = Object.values(allShows.reduce((spaceMemo, show) => {
    spaceMemo[show.order] = {
      address: show.address,
      order: show.order,
      host_name: show.host_name
    };

    return spaceMemo;
  }, {}));

  return (
    <View>
      <MapView
        style={styles.mapStyle}
        provider={PROVIDER_DEFAULT}
        initialRegion={{
          latitude: MAP_CENTER_LATITUDE,
          longitude: MAP_CENTER_LONGITUDE,
          latitudeDelta: MAP_VIEW_DELTA,
          longitudeDelta: MAP_VIEW_DELTA
        }}
      >
        {
        spaces.map(space =>
          <MapMarker
            navigation={navigation}
            space={space}
            key={space.address.location.lat}
          />)
        }
      </MapView>
    </View>
  );
};

const MapMarker = ({ navigation, space }) => {
  const latitude = parseFloat(space.address.location.lat);
  const longitude = parseFloat(space.address.location.lng);

  const openSpaceProgram = () => navigation.navigate('ProgramaEspacio', { space: space });

  return (
    <View>
      <Marker
        coordinate={{ latitude: latitude, longitude: longitude }}
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
  backgroundColor: LINK_COLOR
};

const spaceNumber = {
  textAlign: 'center',
  color: BUTTON_TEXT_COLOR
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
  }
});

export default MapContainer;
