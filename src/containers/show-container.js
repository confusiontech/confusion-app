import React, { useContext } from 'react';
import { StyleSheet, Text, View, Linking, TouchableHighlight, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { getParticipantCategory, getPublic, getAddress } from '../helpers/program-helpers';
import { capitalize } from '../helpers/text-helpers';
import { getEsMoment } from '../helpers/date-helpers';
import { iconsMap } from '../helpers/icon-helpers';
import { ProgramContext } from '../services/program-context';
import { Storage, FAVORITES_STORAGE_KEY } from '../helpers/with-async-storage';

const EXTERNAL_GMAP_ZOOM = 15;
const MAP_VIEW_DELTA = 0.0030;

const ShowContainer = ({ route }) => {
  const show = route.params.show;
  const momentDate = getEsMoment(show.date);
  const momentStartTime = getEsMoment(parseInt(show.time[0]));
  const momentEndTime = getEsMoment(parseInt(show.time[1]));
  const latitude = parseFloat(show.address.location.lat);
  const longitude = parseFloat(show.address.location.lng);

  const { favorites, setFavorites } = useContext(ProgramContext);

  const toggleFavorite = () => {
    const newFavorites = new Set(favorites);
    newFavorites.has(show.id) ? newFavorites.delete(show.id) : newFavorites.add(show.id);
    Storage.set(FAVORITES_STORAGE_KEY, [...newFavorites]);
    setFavorites(newFavorites);
  };

  const favoriteIconId = favorites.has(show.id) ? 'favorites-chosen' : 'favorites';

  let marker = null;

  const setMarkerRef = (ref) => {
    marker = ref;
  };

  const mapUrl = `https://www.google.com/maps/place/${latitude},${longitude}/@${latitude},${longitude},${EXTERNAL_GMAP_ZOOM
}z`;
  const openMapUrl = () => Linking.openURL(mapUrl);

  // TODO: Aqui falta acabar algo, esta función no se usa.
  const showCallout = () => { // eslint-disable-line no-unused-vars
    if (!marker) setTimeout(showCallout, 1);
    else marker.showCallout();
  };

  return (
    <ScrollView style={styles.pageLayout}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{show.title}</Text>
        </View>
        <View style={styles.favoritesIconContainer}>
          <TouchableHighlight
            onPress={toggleFavorite}
            style={styles.favoritesIcon}
            activeOpacity={0.9}
            underlayColor='#DDDDDD'
          >
            {iconsMap.get(favoriteIconId, { size: 30 })}
          </TouchableHighlight>
        </View>
      </View>
      <Text style={styles.artist}>{show.participant_name}</Text>
      <Text style={styles.short_description}>{show.short_description}</Text>
      <View style={styles.grid}>
        <View style={styles.categoryIcon}>
          {iconsMap.get(show.participant_subcategory, { size: 16 })}
        </View>
        <Text style={styles.category}>
          {getParticipantCategory(show)}
        </Text>
      </View>
      <Text style={styles.public}>{getPublic(show)}</Text>
      <Text style={styles.dateTime}>
        {capitalize(momentDate.format('dddd D'))} de {momentStartTime.format('hh:mm')}h a {momentEndTime.format('hh:mm')}h
      </Text>
      <View style={styles.grid}>
        <View style={styles.spaceNumberContainer}>
          <Text style={styles.spaceNumber}>
            {`${show.order}`}
          </Text>
        </View>
        <Text style={styles.space}>
          {show.host_name}
        </Text>
      </View>
      <Text style={styles.address}>{getAddress(show)}</Text>

      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: MAP_VIEW_DELTA,
          longitudeDelta: MAP_VIEW_DELTA
        }}
      >
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          onPress={openMapUrl}
          ref={setMarkerRef}
          anchor={{ x: 0.5, y: 0.5 }}
        >
          <View style={styles.marker}>
            <Text style={styles.markerText}>
              {`${show.order}`}
            </Text>
          </View>
        </Marker>
      </MapView>
    </ScrollView>
  );
};

const FONT_SIZES = {
  H1: 20,
  H2: 18,
  H3: 16,
  NORMAL: 15,
  SMALL: 12
};

const textStyleBase = {
  paddingBottom: 4,
  fontSize: FONT_SIZES.NORMAL
};
const spaceNumberContainer = {
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'blue'
};

const spaceNumber = {
  textAlign: 'center',
  color: 'white'
};

const grid = {
  flexDirection: 'row'
};

const styles = StyleSheet.create({
  grid,
  pageLayout: {
    paddingLeft: 5,
    paddingRight: 5
  },
  header: {
    ...grid,
    flex: 1,
    minHeight: 55
  },
  titleContainer: {
    width: '85%',
    justifyContent: 'center',
    paddingRight: 5
  },
  title: {
    fontSize: FONT_SIZES.H2
  },
  artist: {
    ...textStyleBase,
    fontSize: FONT_SIZES.H3
  },
  short_description: {
    ...textStyleBase
  },
  category: {
    fontSize: FONT_SIZES.NORMAL
  },
  categoryIcon: {
    justifyContent: 'center',
    paddingRight: 5
  },
  dateTime: {
    ...textStyleBase
  },
  public: {
    ...textStyleBase
  },
  spaceNumberContainer: {
    ...spaceNumberContainer,
    width: 20,
    height: 20,
    borderRadius: 10
  },
  spaceNumber: {
    ...spaceNumber,
    fontSize: FONT_SIZES.NORMAL
  },
  space: {
    fontSize: FONT_SIZES.NORMAL,
    paddingLeft: 5
  },
  address: { },
  favoritesIconContainer: {
    justifyContent: 'center'
  },
  favoritesIcon: {
    padding: 8,
    borderRadius: 20
  },
  mapStyle: {
    width: '100%',
    height: 350,
    marginTop: 15
  },
  marker: {
    ...spaceNumberContainer,
    width: 34,
    height: 34,
    borderRadius: 17
  },
  markerText: {
    ...spaceNumber,
    fontSize: 24
  }
});

export default ShowContainer;
