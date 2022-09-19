import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import PageLayout from './page-layout';


const InfoContainer = ({ navigation }) => {
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
  backgroundColor: BUTTON_ACTIVE_COLOR
};

const spaceNumber = {
  textAlign: 'center',
  color: BUTTON_TEXT_COLOR
};

const styles = StyleSheet.create({
  initialText: {
    fontWeight: 'bold',
    position: 'absolute',
    top: 4,
    right: 7,
    zIndex: 9,
    fontSize: 16,
    textAlign: 'right',
    width: '65%'
  }
});

export default InfoContainer;
