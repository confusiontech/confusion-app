import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { Container, Header, Content, Left, Body, Right, Title, Subtitle } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import ProgramContainer from './src/containers/program-container';
import FilterContainer from './src/containers/filter-container';
import EventContainer from './src/containers/event-container';
import ProgramUpdater from './src/services/program-updater';
import { ProgramContextProvider } from './src/services/program-context';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ProgramContextProvider>
        <ProgramUpdater/>
        <Stack.Navigator>
          <Stack.Screen name="Programa" component={ProgramContainer} />
          <Stack.Screen name="Filter" component={FilterContainer} />
          <Stack.Screen name="Evento" component={EventContainer} />
        </Stack.Navigator>
      </ProgramContextProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#fff'
  },
  container: {
    flex: 1,
    color: '#fff',
    backgroundColor: '#8C1D98',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
