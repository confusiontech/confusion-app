import React from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { List, ListItem, Accordion, Text, Button, Left, Right } from 'native-base';

const Program = ({ shows }) => (
    <List
      dataArray={shows}
      keyExtractor={item => item.id + item.time[0]}
      renderRow={(item) => Item(item)}>
    </List>
)

function Item(item) {
  return (
      <ListItem>
      <View>
      <Left>
            <Text>{item.title} | {item.participant_category}</Text>
      </Left>
      </View>
    </ListItem>
  );
}

export default Program;
