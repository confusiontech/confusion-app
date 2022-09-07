import React from 'react';
import { View } from 'react-native';
import NavigationBar from '../components/navigation-bar';

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
      <View style={{ flex: 0.9 }}>
        {children}
      </View>
      <View style={{ flex: 0.1 }}>
        <NavigationBar navigation={navigation} />
      </View>
    </View>
  );
};

export default PageLayout;
