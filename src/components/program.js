import React from 'react';
import { FlatList, Text, SafeAreaView, View, StyleSheet, ScrollView } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

function msToTime(s) {
  const date = new Date(parseInt(s));
  return date.toLocaleTimeString();
}

const renderItem = ({ item }) => <Item item={item}/>;

const extractKey = item => item.id + item.time[0];

const Program = ({ shows }) => {
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

function Item({ item }) {
  return (
    <View  style={styles.grid}>
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
          {item.participant_category}
        </Text>
      </View>
    </View>
  );
}

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
