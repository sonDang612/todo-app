import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import screenNames from './app/routes/screenNames';
import { modalRoutes, routes } from './app/routes';
const Stack = createNativeStackNavigator();
export const navigationRef = createNavigationContainerRef();

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={screenNames.HomeScreen}
        screenOptions={{ animation: 'ios', headerShown: false }}>
        {routes.map(route => (
          <Stack.Screen {...route} key={route.name} />
        ))}

        <Stack.Group
          screenOptions={{
            presentation: 'transparentModal',
            animation: 'slide_from_bottom',
          }}>
          {modalRoutes.map(route => (
            <Stack.Screen {...route} key={route.name} />
          ))}
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
