import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavigationBar from '../components/navigation-bar';

const PageLayout = ({ children, navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View>
        <View style={{ height: '92%' }}>
          {children}
        </View>
      </View>
      <NavigationBar navigation={navigation} style={styles.buttonsContainer} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '8%',
    flexDirection: 'row',
    width: '100%'
  }
});

export default PageLayout;
