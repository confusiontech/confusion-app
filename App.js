import React, { useRef } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import ProgramContainer from './src/containers/program-container';
import FilterContainer from './src/containers/filter-container';
import ShowContainer from './src/containers/show-container';
import MapContainer from './src/containers/map-container';
import FavoritesContainer from './src/containers/favorites-container';
import SpaceProgramContainer from './src/containers/space-program-container';
import SpaceListContainer from './src/containers/space-list-container';
import InfoContainer from './src/containers/info-container';
import ProgramUpdater from './src/services/program-updater';
import Announcement from './src/components/announcement';
import { ProgramContextProvider } from './src/services/program-context';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  const navigationRef = useRef(null);

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer ref={navigationRef}>
          <ProgramContextProvider>
            <ProgramUpdater />
            <Stack.Navigator>
              <Stack.Screen name='Programa' component={ProgramContainer} />
              <Stack.Screen name='Filtro' component={FilterContainer} />
              <Stack.Screen name='Evento' component={ShowContainer} />
              <Stack.Screen name='Mapa' component={MapContainer} />
              <Stack.Screen name='Favoritos' component={FavoritesContainer} />
              <Stack.Screen name='ProgramaEspacio' component={SpaceProgramContainer} />
              <Stack.Screen name='Espacios' component={SpaceListContainer} />
              <Stack.Screen name='Info' component={InfoContainer} />
            </Stack.Navigator>
            <Announcement navigationRef={navigationRef} />
          </ProgramContextProvider>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
