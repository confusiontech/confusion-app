import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Dimensions, Text, View, Linking } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import { getParticipantCategory, getPublic, getAddress } from '../helpers/program-helpers';
import { capitalize } from '../helpers/text-helpers';
import { getEsMoment } from '../helpers/date-helpers';

const ShowContainer = ({ route }) => {
  const show = route.params.show;
  const momentDate = getEsMoment(show.date);
  const momentStartTime = getEsMoment(parseInt(show.time[0]));
  const momentEndTime = getEsMoment(parseInt(show.time[1]));
  const latitude = parseFloat(show.address.location.lat);
  const longitude = parseFloat(show.address.location.lng);

  let marker = null;

  const setMarkerRef = (ref) => {
    marker = ref;
  };

  const mapUrl = `https://www.google.com/maps/place/${latitude},${longitude}/@${latitude},${longitude},15z`;
  const openMapUrl = ()=> Linking.openURL(mapUrl);

  return (
      <View>
        <Text>{show.participant_name}</Text>
        <Text>{show.title}</Text>
        <Text>{show.short_description}</Text>
        <Text>{getParticipantCategory(show)}</Text>
        <Text>
          {capitalize(momentDate.format('dddd D'))} de {momentDate.format('MMMM')} de {momentDate.format('YYYY')}
          </Text>
        <Text>
          De {momentStartTime.format('hh:mm')}h a {momentEndTime.format('hh:mm')}h
          </Text>
        <Text>{getPublic(show)}</Text>
        <Text>{show.order} {show.host_name}</Text>
        <Text>{getAddress(show)}</Text>

        <MapView style={styles.mapStyle}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0022,
            longitudeDelta: 0.002
          }}
    onLayout={() => marker.showCallout()} >
          <Marker coordinate={{latitude: latitude, longitude: longitude}} onPress={openMapUrl} ref={setMarkerRef}>
            <Callout onPress={openMapUrl}>
              <View>
                <Text>{`${show.order}: ${show.host_name}`}</Text>
              </View>
            </Callout>
          </Marker>
        </MapView>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: 300,
    height: 300
  },
});

export default ShowContainer;
