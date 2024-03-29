import React from 'react';
import { TouchableHighlight, Text, View, StyleSheet } from 'react-native';
import { iconsMap } from '../helpers/icon-helpers';
import moment from 'moment';
import 'moment/locale/es';
import DrawAttentionView from './draw-attention-view';
import { TOUCHABLE_UNDERLAY_COLOR } from '../styles/colors';

const iconStyles = {
  '1_icon': { size: 26 },
  '2_icon': { size: 22 },
  '3_icon': { size: 18 },
  '4_icon': { size: 18 }
};

const ProgramItem = React.memo(({ navigation, show, nowDt }) => {
  const date = moment(show.date).format('DD MMM');
  const startTime = moment(parseInt(show.time[0])).format('HH:mm');

  const subcategoriesNumber = show.participant_subcategories.length;
  const iconStyleKey = `${subcategoriesNumber}_icon`;
  const categoryIcons = show.participant_subcategories.map(subcat => iconsMap.get(subcat, iconStyles[iconStyleKey] || iconStyles['4_icon']));

  const navigateToEvent = () => navigation.navigate('Evento', { show });

  const start = parseInt(show.time[0]);
  const end = parseInt(show.time[1]);

  const baseIcon = (
    <Text style={styles.icon}>
      {categoryIcons}
    </Text>
  );

  let icon = baseIcon;

  const isLive = start <= nowDt && nowDt < end;

  if (isLive) {
    icon = (
      <DrawAttentionView>
        {baseIcon}
      </DrawAttentionView>
    );
  }

  return (
    <TouchableHighlight
      onPress={navigateToEvent}
      activeOpacity={0.9}
      underlayColor={TOUCHABLE_UNDERLAY_COLOR}
    >
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
            {parseInt(show.order) + 1}
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

export default ProgramItem;
