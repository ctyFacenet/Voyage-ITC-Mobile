/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

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


import Login from './src/login/Login';
import Home from './src/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ioncions from 'react-native-vector-icons/Ionicons';
import Voyage from './src/Voyage';

const keycloak = new RNKeycloak({
  url: 'https://sso.xfactory.vn/auth/',
  realm: 'dev',
  clientId: 'angular-client',
})

const Stack = createNativeStackNavigator()

const Tab = createBottomTabNavigator()

function HomeTab() {
  return (
    <Tab.Navigator initialRouteName='Home'
    screenOptions={({route}) => ({
      animation: 'shift',
      headerShown: false,
      tabBarIcon: ({focused, color, size}) => {
        var iconName = '';
        let rn = route.name;

        if(rn === 'Home'){
          iconName = focused ? 'home' : 'home-outline';
        } else if(rn === 'Voyage'){
          iconName = focused ? 'list' : 'list-outline';
        }
        return <Ioncions name={iconName} color={color} size={size}/>

      },
      tabBarActiveTintColor: 'green',
      tabBarInactiveTintColor: 'gray',
      tabBarLabelStyle: {paddingBottom: 10, fontSize: 10},
      tabBarStyle: {
        height: 50
      }
      
    })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name='Voyage' component={Voyage}/>
    </Tab.Navigator>
  );
}

function App(): React.JSX.Element {
  

  return (
    <ReactNativeKeycloakProvider
    authClient={keycloak}
    initOptions={{redirectUri: 'itc-mobile://auth'}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={keycloak?.authenticated ? 'Home' : 'Login'} screenOptions={{headerShown: false}}>
          <Stack.Screen name='Login' component={Login}></Stack.Screen>
          <Stack.Screen name='HomeTab' component={HomeTab}></Stack.Screen>
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
