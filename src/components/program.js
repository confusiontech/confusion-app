import React from 'react';
import { TouchableHighlight, FlatList, Text, SafeAreaView, View, StyleSheet } from 'react-native';
import { iconsMap } from '../helpers/icon-helpers';
import moment from 'moment';
import 'moment/locale/es';
import DrawAttentionView from './draw-attention-view';

const TEN_MINUTES = 10 * 60 * 1000;
const ROW_HEIGHT = 80;

const extractKey = item => item.id + item.time[0];

// TODO: Remove hardcoded date, use `new Date().getTime()`
const getNow = () => new Date(2019, 9, 20, 19, 9).getTime();

const Program = ({ navigation, shows, goToNowEvent }) => {
  // TODO: Avoid new function on every call, it breaks equality checks which causes additional re-renders
  const renderItem = ({ item }) => <ProgramItem navigation={navigation} show={item} now={getNow()} />;

  const flatListRef = React.createRef();

  goToNowEvent.current = () => {
    if (shows.length > 0) {
      const now = getNow();
      let nowIndex = shows.findIndex(show => show.time[0] > now - TEN_MINUTES);
      nowIndex = Math.max(0, nowIndex);

      return flatListRef.current.scrollToIndex({ index: nowIndex, viewPosition: 0 });
    } else {
      return false;
    }
  };

  return (
    <View>
      <SafeAreaView>
        <FlatList
          data={shows}
          renderItem={renderItem}
          keyExtractor={extractKey}
          ref={flatListRef}
          getItemLayout={(_show, index) => ({
            offset: ROW_HEIGHT * index,
            length: ROW_HEIGHT,
            index
          })}
        />
      </SafeAreaView>
    </View>
  );
};

const ProgramItem = React.memo(({ navigation, show, now }) => {
  const date = moment(show.date).format('DD MMM');
  const startTime = moment(parseInt(show.time[0])).format('HH:mm');
  const categoryIcon = iconsMap.get(show.participant_subcategory);
  const navigateToEvent = () => navigation.navigate('Evento', { show: show });

  const start = parseInt(show.time[0]);
  const end = parseInt(show.time[1]);

  const baseIcon = (
    <Text style={styles.icon}>
      {categoryIcon}
    </Text>
  );

  let icon = baseIcon;

  const isLive = start <= now && now < end;

  if (isLive) {
    icon = (
      <DrawAttentionView>
        {baseIcon}
      </DrawAttentionView>
    );
  }

  return (
    <TouchableHighlight onPress={navigateToEvent}>
      <View style={styles.grid}>
        <View
          style={styles.categoryContainer}
        >
          {icon}
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
    height: 80
  },
  categoryContainer: {
    width: '12%',
    justifyContent: 'center'
  },
  icon: {
    textAlign: 'center'
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
    textAlign: 'center'
  },
  time: {
    fontSize: 16,
    textAlign: 'center'
  },
  spaceContainer: {
    width: '10%',
    justifyContent: 'center'
  },
  space: {
    paddingLeft: 5,
    fontSize: 16
  },
  smallCaption: {
    fontSize: 10,
    textAlign: 'center'
  }
});

export default Program;
