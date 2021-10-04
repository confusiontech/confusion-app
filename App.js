import React from 'react';
import 'react-native-gesture-handler';
import ProgramContainer from './src/containers/program-container';
import FilterContainer from './src/containers/filter-container';
import ShowContainer from './src/containers/show-container';
import MapContainer from './src/containers/map-container';
import ProgramUpdater from './src/services/program-updater';
import { ProgramContextProvider } from './src/services/program-context';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ProgramContextProvider>
        <ProgramUpdater />
        <Stack.Navigator>
          <Stack.Screen name='Programa' component={ProgramContainer} />
          <Stack.Screen name='Filtro' component={FilterContainer} />
          <Stack.Screen name='Evento' component={ShowContainer} />
          <Stack.Screen name='Mapa' component={MapContainer} />
        </Stack.Navigator>
      </ProgramContextProvider>
    </NavigationContainer>
  );
}
