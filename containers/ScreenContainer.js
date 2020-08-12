import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen'
import FriendScreen from '../screens/FriendScreen'
import ProfileScreen from '../screens/ProfileScreen'

import Ionicons from 'react-native-vector-icons/Ionicons';





const Tab = createBottomTabNavigator();

const  ScreenContainer =(props)=> {
 
  return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused
                  ? 'ios-home'
                  : 'ios-home';
              } else if (route.name === 'Friends') {
                iconName = focused ? 'ios-people' : 'ios-people';
              }
              else if (route.name === 'Profile') {
                iconName = focused ? 'ios-person' : 'ios-person';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen}  />
          <Tab.Screen name="Friends" component={FriendScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />

        </Tab.Navigator>
      </NavigationContainer>
  );
}

export default ScreenContainer