import React from 'react';
import { FlatList, Text, SafeAreaView, View } from 'react-native';

const Program = ({ shows }) => (
  <SafeAreaView>
    <FlatList
      data={shows}
      renderItem={({ item }) => <Item item={item}/>}
      keyExtractor={item => item.id + item.time[0]}
    />
  </SafeAreaView>
)

function Item({ item }) {
  return (
    <View>
      <Text>{item.title} | {item.participant_category}</Text>
    </View>
  );
}

export default Program;
