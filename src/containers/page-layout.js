import React from 'react';
import { View } from 'react-native';
import NavigationBar from '../components/navigation-bar';
import {
  LAYOUT_COLOR
} from '../styles/colors';

const PageLayout = ({ children, navigation, showBackArrow }) => {
  React.useLayoutEffect(() => {
    if (!showBackArrow) {
      navigation.setOptions({
        headerLeft: () => {}
      });
    }
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: LAYOUT_COLOR }}>
        {children}
      </View>
      <NavigationBar navigation={navigation} />
    </View>
  );
};

export default PageLayout;
