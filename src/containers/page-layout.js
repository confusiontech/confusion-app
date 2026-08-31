import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationBar from '../components/navigation-bar';
import {
  BUTTON_COLOR,
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
      <SafeAreaView edges={['bottom']} style={{ backgroundColor: BUTTON_COLOR }}>
        <NavigationBar navigation={navigation} />
      </SafeAreaView>
    </View>
  );
};

export default PageLayout;
