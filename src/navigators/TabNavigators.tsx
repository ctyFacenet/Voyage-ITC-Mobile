import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/AntDesign';
import Home from "../screens/Home/HomeScreen";
import Voyage from "../screens/Voyage/VoyageScreen";
import NotificationScreen from "../screens/Notification/NotificationScreen";
import { COLORS, FONTSIZE, SPACING } from "../../theme/theme";
import { Colors } from "react-native/Libraries/NewAppScreen";
import ApprovalScreen from "../screens/Approval/ApprovalScreen";

const Tab = createBottomTabNavigator();

function HomeTab() {
  return (
    <Tab.Navigator initialRouteName='Home'
    screenOptions={({route}) => ({
      animation: 'shift',
      headerShown: false,
      tabBarIcon: ({focused, color, size}) => {
        var iconName = '';
        let rn = route.name;
        color = focused ? COLORS.primary : COLORS.text;

        if(rn === 'Home'){
          iconName =  'home' ;

        } else if(rn === 'Approval'){
          iconName = 'filetext1';
        }
        
        else if(rn === 'Notification'){
          iconName = 'bells';
        }
        return <Icon name={iconName} color={color} size={size}   />

      },
      tabBarActiveTintColor: 'green',
      tabBarInactiveTintColor: 'gray',
      tabBarLabelStyle: {paddingBottom: 10, fontSize: 10},
      tabBarStyle: {
        height: 60
      },
      headerPressColor: COLORS.primary
      
    })}
    >
      <Tab.Screen name="Home" component={Home} options={{ 
        
        title: 'Trang chủ', 
        headerPressColor: '#333'
    }}    />
      <Tab.Screen name='Approval' component={ApprovalScreen}  options={{ 
        
        title: 'Phê duyệt', 
        headerPressColor: '#333'
    }} />
      <Tab.Screen name='Notification' component={NotificationScreen}/>

    </Tab.Navigator>
  );
}

export default HomeTab;


