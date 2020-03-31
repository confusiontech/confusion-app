import React from 'react';
import { Text,  FlatList, View } from 'react-native';

const Program = ({ shows }) => (
  <View>
    < FlatList
     data={shows}
    renderItem={({item}) => (
      <Text>
        {item.title} | {item.participant_category}
      </Text>
    )}
    />
  </View>
)

export default Program;