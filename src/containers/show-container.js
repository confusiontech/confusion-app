import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { getParticipantCategory, getPublic, getAddress } from '../helpers/program-helpers';
import { capitalize } from '../helpers/text-helpers';
import { getEsMoment } from '../helpers/date-helpers';

const ShowContainer = ({ route }) => {
  const show = route.params.show;
  const momentDate = getEsMoment(show.date);
  const momentStartTime = getEsMoment(parseInt(show.time[0]));
  const momentEndTime = getEsMoment(parseInt(show.time[1]));
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
      </View>
  );
};

export default ShowContainer;
