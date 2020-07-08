import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

const EventContainer = ({ route }) => {
  const event = route.params.event;
  return (
      <View>
        <Text>{event.title}</Text>
      </View>
  );
};

export default EventContainer;
