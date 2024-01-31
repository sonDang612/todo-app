import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import routes from './app/routes';
import screenNames from './app/routes/screenNames';
const Stack = createNativeStackNavigator();
export const navigationRef = createNavigationContainerRef();

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={screenNames.HomeScreen}
        screenOptions={{ animation: 'ios' }}>
        {routes.map((route, index) => (
          <Stack.Screen {...route} key={index} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
