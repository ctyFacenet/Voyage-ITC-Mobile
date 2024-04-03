/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import { ReactNativeKeycloakProvider, RNKeycloak } from '@react-keycloak/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


import Login from './src/screens/login/Login';
import Home from './src/screens/Home/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ioncions from 'react-native-vector-icons/Ionicons';
import Voyage from './src/screens/Voyage/VoyageScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeTab from './src/navigators/TabNavigators';
import { environment } from './src/environment/environment.cloud';
import Filter from './src/screens/Approval/FilterScreen';


// const keycloak = new RNKeycloak({...environment.keycloak})
const keycloak = new RNKeycloak({
  url: 'https://sso.xfactory.vn/auth/',
  realm: 'dev',
  clientId: 'angular-client',
})

const Stack = createNativeStackNavigator()

const Tab = createBottomTabNavigator()



function App(): React.JSX.Element {
  

  return (
    <ReactNativeKeycloakProvider
    authClient={keycloak}
    initOptions={{redirectUri: 'itc-mobile://auth'}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={keycloak?.authenticated ? 'Home' : 'Login'} screenOptions={{headerShown: false}}>
          <Stack.Screen name='Login' component={Login}></Stack.Screen>
          <Stack.Screen name='HomeTab' component={HomeTab}></Stack.Screen>
          <Stack.Screen name='Filter' component={Filter}></Stack.Screen>

          
        </Stack.Navigator>
      </NavigationContainer>
    </ReactNativeKeycloakProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
