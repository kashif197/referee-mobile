import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import FirstScreen from './screens/FirstScreen'
import LoginScreen from './screens/LoginScreen'
import CreateProfile from './screens/CreateProfile'
import POCScreen from './screens/POCScreen'
import HomeScreen from './screens/HomeScreen'
import EmailScreen from './screens/EmailScreen'
import ProfileScreen from './screens/ProfileScreen'
import OfferScreen from './screens/OffersScreen'
import EditScreen from './screens/EditScreen'
import AddOffer from './screens/AddOffer'

const Stack = createStackNavigator();


export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="First" component={FirstScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Create" component={CreateProfile} />
          <Stack.Screen options={{ headerShown: false }} name="POC" component={POCScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Email" component={EmailScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Profile" component={ProfileScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Offers" component={OfferScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Edit" component={EditScreen} />
          <Stack.Screen options={{ headerShown: false }} name="AddOffer" component={AddOffer} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
