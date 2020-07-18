import React from 'react';
import { TouchableHighlight, FlatList, Text, SafeAreaView, View, StyleSheet, ScrollView } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import eventService from '../services/event-service'

const categoriesMap = eventService.getAllCategories();

function msToTime(s) {
  const date = new Date(parseInt(s));
  return date.toLocaleTimeString();
}

const extractKey = item => item.id + item.time[0];

const Program = ({ navigation, shows }) => {
  // TODO: Avoid new function on every call, it breaks equality checks which causes additional re-renders
  const renderItem = ({ item }) => <Item navigation={navigation} item={item}/>;

  return (
    <SafeAreaView>
      <FlatList
        data={shows}
        renderItem={renderItem}
        keyExtractor={extractKey}
      />
    </SafeAreaView>
  )
}

const Item = React.memo(({ navigation, item }) => {
  return (
    <TouchableHighlight onPress={() => navigation.navigate('Evento', {event: item})}>
      <View style={styles.grid} >
      <View style={{ backgroundColor: '#635DB7', width: '25%'}}>
        <Text> 
          {msToTime(item.time[0])}
        </Text>
      </View>
      <View style={{ backgroundColor: '#635DB7', width: '25%'}}>
        <Text> 
          {item.title}
        </Text>
      </View>
      <View size={25} style={{ backgroundColor: '#00CE9F', width: '15%'}}>
        <Text> 
          {categoriesMap.get(item.participant_subcategory)}
        </Text>
      </View>
      </View>
    </TouchableHighlight>
  );
});

const styles = StyleSheet.create({
  grid: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    flex: 1, 
    flexDirection: 'row',
    height: 50
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

export default Program;
