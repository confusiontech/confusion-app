import React, {PureComponent} from 'react';
import { TouchableHighlight, FlatList, Text, SafeAreaView, View, StyleSheet, ScrollView } from 'react-native';
// import { Col, Row, Grid } from 'react-native-easy-grid';
import { Ionicons } from '@expo/vector-icons';
import { iconsMap } from '../helpers/icon-helpers'
import eventService from '../services/event-service'
import moment from 'moment'
import 'moment/locale/es';


const categoriesMap = eventService.getAllCategories();

const extractKey = item => item.id + item.time[0];

const Program = ({ navigation, shows }) => {
  // TODO: Avoid new function on every call, it breaks equality checks which causes additional re-renders
  const renderItem = ({ item }) => <ProgramItem navigation={navigation} show={item} />;

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

const ProgramItem = React.memo(({ navigation, show }) => {
  const date = moment(show.date).format('DD MMM');
  const startTime = moment(parseInt(show.time[0])).format('hh:mm');
  const categoryIcon = iconsMap.get(show.participant_subcategory);
  const navigateToEvent = () => navigation.navigate('Evento', {show: show});

  return (
    <TouchableHighlight onPress={navigateToEvent}>
      <View style={styles.grid} >
        <View 
          style={styles.categoryContainer}
        >
          <Text style={styles.icon}>
            {categoryIcon} 
          </Text>
        </View>
        <View 
          style={styles.dateContainer}
        >
          <Text style={styles.date}> 
            {date}
          </Text>
          <Text 
            style={styles.time}
          > 
            {startTime}h
          </Text>
        </View>
        <View style={styles.artistNameAndTitleContainer}>
          <Text 
            style={styles.artistName} 
            numberOfLines={2}
          > 
            {show.participant_name}
          </Text>
          <Text 
            style={styles.title} 
            numberOfLines={2}
          > 
            {show.title}
          </Text>
        </View>
        <View 
          style={styles.spaceContainer}
        >
          <Text style={styles.space}> 
            {show.order}
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
    height: 80,
  },
  categoryContainer: {
    width: '12%', 
    justifyContent: 'center'
  },
  icon: {
    textAlign:'center'
  },
  artistNameAndTitleContainer: {
    width: '60%', 
    justifyContent: 'center',
    paddingLeft: 4, 
    paddingRight: 2
  },
  artistName: {
  },
  title: {
    fontSize: 16
  },
  dateContainer: {
    width: '18%', 
    justifyContent: 'center'
  },
  date: {
    textAlign:'center'
  },
  time: {
    fontSize: 16,
    textAlign:'center'
  },
  spaceContainer: {
    width: '10%', 
    justifyContent: 'center',
  },
  space: {
    paddingLeft: 5,
    fontSize: 16
  }
});

export default Program;
