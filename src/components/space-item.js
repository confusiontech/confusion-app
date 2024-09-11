import React from 'react';
import { TouchableHighlight, Text, View, StyleSheet } from 'react-native';
import {
  TOUCHABLE_UNDERLAY_COLOR,
  SPACE_NUMBER_CIRCLE_COLOR,
  SPACE_NUMBER_TEXT_COLOR
} from '../styles/colors';

const SpaceItem = React.memo(({ navigation, space }) => {
  const openSpaceProgram = () => navigation.navigate('ProgramaEspacio', { space });

  return (
    <TouchableHighlight
      onPress={openSpaceProgram}
      activeOpacity={0.9}
      underlayColor={TOUCHABLE_UNDERLAY_COLOR}
    >
      <View style={styles.grid}>
        <View
          style={styles.spaceNumberContainer}
        >
          <View
            style={styles.spaceNumberInnerContainer}
          >
            <Text style={styles.spaceNumber}>
              {space.order + 1}
            </Text>
          </View>
        </View>
        <View style={styles.spaceNameAndAddressContainer}>
          <Text
            style={styles.spaceName}
            numberOfLines={2}
          >
            {space.host_name}
          </Text>
          <Text
            style={styles.spaceName}
            numberOfLines={2}
          >
            {space.address.route} {space.address.street_number}
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
  spaceNumberContainer: {
    width: '15%',
    justifyContent: 'center'
  },
  spaceNumberInnerContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: SPACE_NUMBER_CIRCLE_COLOR,
    justifyContent: 'center',
    marginLeft: 8
  },
  spaceNumber: {
    textAlign: 'center',
    fontSize: 20,
    color: SPACE_NUMBER_TEXT_COLOR
  },
  spaceNameAndAddressContainer: {
    width: '85%',
    justifyContent: 'center',
    paddingLeft: 4,
    paddingRight: 2
  },
  spaceName: {
  },
  title: {
    fontSize: 16
  }
});

export default SpaceItem;
