import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FirstScreen from './screens/FirstScreen'
import LoginScreen from './screens/LoginScreen'
import CreateProfile from './screens/CreateProfile'

const Stack = createStackNavigator();


export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Create" component={CreateProfile} />
          {/* <Stack.Screen options={{ headerShown: false }} name="First" component={FirstScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
