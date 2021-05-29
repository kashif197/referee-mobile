import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements'

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
import ForgotPassword from './screens/ForgotPassword'
import SupportScreen from './screens/SupportScreen';
import PasscodeScreen from './screens/PasscodeScreen'
import NewPassword from './screens/NewPassword'
import RequestSupport from './screens/RequestSupport'

import LoginContextProvider from './contexts/LoginContext';
import FinanceScreen from './screens/FinanceScreen';
import RecordScreen from './screens/RecordScreen';
import AddCredit from './screens/AddCredit';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator tabBarOptions={{activeTintColor: '#2ec4b6'}}>
      <Tab.Screen
        name="Offers"
        component={OfferScreen}
        options={{
          tabBarIcon: ({color}) => {
            return (
              <Icon name="md-basket" type="ionicon" color= {color} />
            );
          }
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color}) => {
            return (
              <Icon name="md-notifications" type="ionicon" color= {color} />
            );
          }
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color}) => {
            return (
              <Icon name="md-person" type="ionicon" color= {color} />
            );
          }
        }}
      />
      <Tab.Screen
        name="Finance"
        component={FinanceScreen}
        options={{
          tabBarIcon: ({color}) => {
            return (
              <Icon name="wallet" type="ionicon" color= {color} />
            );
          }
        }}
      />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <LoginContextProvider>
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
            <Stack.Screen options={{ headerShown: false }} name="Offers" component={MyTabs}
            // options={{
            //   headerRight: () => (
            //     <Avatar
            //       rounded
            //       source={{ uri: 'https://lh3.googleusercontent.com/a-/AOh14GgLQAod-ufw4w9xEig-YCQT-SFJahNGzuprDhIusg=s96-c' }}
            //       size={40}
            //       containerStyle={{ marginRight: 15 }}
            //     />
            //   )
            // }}

            />
            <Stack.Screen options={{ headerShown: false }} name="Edit" component={EditScreen} />
            <Stack.Screen options={{ headerShown: false }} name="AddOffer" component={AddOffer} />
            <Stack.Screen options={{ headerShown: false }} name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen options={{ headerShown: false }} name="Support" component={SupportScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Passcode" component={PasscodeScreen} />
            <Stack.Screen options={{ headerShown: false }} name="NewPassword" component={NewPassword} />
            <Stack.Screen options={{ headerShown: false }} name="RequestSupport" component={RequestSupport} />
            <Stack.Screen options={{ headerShown: false }} name="Record" component={RecordScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Add" component={AddCredit} />

          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </LoginContextProvider>

  );
}
