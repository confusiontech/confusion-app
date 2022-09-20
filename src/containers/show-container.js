import React, { useContext } from 'react';
import { StyleSheet, Text, View, Linking, TouchableHighlight, ScrollView } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';

import { getParticipantCategoryById, getPublic, getAddress } from '../helpers/program-helpers';
import { capitalize } from '../helpers/text-helpers';
import { getMapAppLink } from '../helpers/link-helpers';
import { getEsMoment } from '../helpers/date-helpers';
import { iconsMap } from '../helpers/icon-helpers';
import { ProgramContext } from '../services/program-context';
import { Storage, FAVORITES_STORAGE_KEY } from '../helpers/with-async-storage';
import {
  LINK_COLOR,
  TOUCHABLE_UNDERLAY_COLOR,
  BUTTON_TEXT_COLOR,
  PRIMARY_COLOR
} from '../styles/colors';

import PageLayout from './page-layout';

const MAP_VIEW_DELTA = 0.0030;

const ShowContainer = ({ route, navigation }) => {
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

  const mapUrl = getMapAppLink(latitude, longitude);

  const openMapUrl = () => Linking.openURL(mapUrl);

  // TODO: Aqui falta acabar algo, esta función no se usa.
  const showCallout = () => { // eslint-disable-line no-unused-vars
    if (!marker) setTimeout(showCallout, 1);
    else marker.showCallout();
  };

  return (
    <PageLayout navigation={navigation} showBackArrow>
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
              underlayColor={TOUCHABLE_UNDERLAY_COLOR}
            >
              {iconsMap.get(favoriteIconId, { size: 30, color: PRIMARY_COLOR })}
            </TouchableHighlight>
          </View>
        </View>
        <Text style={styles.artist}>{show.participant_name}</Text>
        <Text style={styles.short_description}>{show.short_description}</Text>

        {show.participant_subcategories.map(id =>
        (
          <View key={id} style={styles.grid}>
            <View style={styles.categoryIcon}>
              {iconsMap.get(id, { size: 16 })}
            </View>
            <Text style={styles.category}>
              {getParticipantCategoryById(id)}
            </Text>
          </View>
        )
        )}

        <Text style={styles.public}>{getPublic(show)}</Text>
        <Text style={styles.dateTime}>
          {capitalize(momentDate.format('dddd D'))} de {momentStartTime.format('HH:mm')}h a {momentEndTime.format('HH:mm')}h
        </Text>
        <TouchableHighlight
          onPress={openMapUrl}
          activeOpacity={0.9}
          underlayColor={TOUCHABLE_UNDERLAY_COLOR}
          style={styles.spaceContainer}
        >
          <View>
            <View style={styles.grid}>
              <View style={styles.spaceNumberContainer}>
                <Text style={styles.spaceNumber}>
                  {`${parseInt(show.order) + 1}`}
                </Text>
              </View>
              <Text style={styles.space}>
                {show.host_name}
              </Text>
            </View>
            <View style={styles.grid}>
              <Text style={styles.address}>{getAddress(show)}</Text>
              {iconsMap.get('external-link', { size: 16, color: LINK_COLOR })}
            </View>
          </View>
        </TouchableHighlight>

        <MapView
          style={styles.mapStyle}
          provider={PROVIDER_DEFAULT}
          showsUserLocation={true}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: MAP_VIEW_DELTA,
            longitudeDelta: MAP_VIEW_DELTA
          }}
        >
          <Marker
            coordinate={{ latitude, longitude }}
            onPress={openMapUrl}
            ref={setMarkerRef}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>
                {`${parseInt(show.order) + 1}`}
              </Text>
            </View>
          </Marker>
        </MapView>
      </ScrollView>
    </PageLayout>
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
  backgroundColor: LINK_COLOR
};

const spaceNumber = {
  textAlign: 'center',
  color: BUTTON_TEXT_COLOR
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
  spaceContainer: {
    ...grid,
    alignSelf: 'flex-start'
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
    paddingLeft: 5,
    color: LINK_COLOR
  },
  address: {
    color: LINK_COLOR,
    marginEnd: 10
  },
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
