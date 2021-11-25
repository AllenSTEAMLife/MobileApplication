import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import HomePage from './scenes/HomePage';
import NotificationScreen from './scenes/NotificationScreen';
import ServiceScreen from './scenes/ServiceScreen';
import CalendarScreen from './scenes/calendarScreen';
import SettingsScreen from './scenes/SettingsScreen';
import LoginScreen from './scenes/SignInScreen';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import HomePageSettings from './scenes/HomePageSettings';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const SettingsStack = () => {
  return(
  <Stack.Navigator initialRouteName='Settings' screenOptions={{headerShown: false}}>
    <Stack.Screen name='TabNav' component={TabNav}/>
    <Stack.Screen name='Settings' component={SettingsScreen}/>
    <Stack.Screen name='LogIn' component={LoginScreen}/>
          <Stack.Screen name='Notification' component={NotificationScreen}/>
          <Stack.Screen name='HomePageSettings' component={HomePageSettings}/>
          {/* <Stack.Screen name='Feedback' component={feedbackScreen}/> */}
        </Stack.Navigator>
        );
}
const TabNav = () => {
  return (
  <Tab.Navigator screenOptions={{headerShown: false}} >
      <Tab.Screen name="Home" component={HomePage} options={{tabBarLabel:"", tabBarIcon: (focused, tintColor) => (<Image style={{ width:35, height: 35, marginTop: 10 }} source={require('./assets/images/steamlogoblackonwhite.png')} /> )}}/>
      <Tab.Screen name="Notifications" component={NotificationScreen} options={{tabBarLabel:"Notifications", tabBarIcon: (focused, tintColor) => (<Image style={{ width:30, height: 30, marginTop: 10 }} source={require('./assets/images/notif.png')} /> )}}/>
      <Tab.Screen name="Service"  component={ServiceScreen} options={{tabBarLabel:"Service", tabBarIcon: (focused, tintColor) => (<Image style={{ width:30, height: 30, marginTop: 10 }} source={require('./assets/images/listings.png')} /> )}}/>
      <Tab.Screen name="Calendar"  component={CalendarScreen} options={{tabBarLabel:"Calendar", tabBarIcon: (focused, tintColor) => (<Image style={{ width:30, height: 30, marginTop: 10 }} source={require('./assets/images/calendar.png')} /> )}}/>
      <Tab.Screen name="Settings"  component={SettingsScreen} options={{tabBarLabel:"Settings", tabBarIcon: (focused, tintColor) => (<Image style={{ width:30, height: 30, marginTop: 10 }} source={require('./assets/images/feedback.png')} /> )}}/>
  </Tab.Navigator>
  );
}

export default function App() {
  const [loaded] = useFonts({
    'Montserrat-ExtraBold': require('./assets/fonts/Montserrat-ExtraBold.ttf'),
    'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
  });
  
  if (!loaded) {
    return null;
  }
  
  return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={{headerShown: false}} >
      <Tab.Screen name="Home" component={HomePage} options={{tabBarLabel:"", tabBarIcon: (focused, tintColor) => (<Image style={{ width:35, height: 35, marginTop: 10 }} source={require('./assets/images/steamlogoblackonwhite.png')} /> )}}/>
      <Tab.Screen name="Notifications" component={NotificationScreen} options={{tabBarLabel:"Notifications", tabBarIcon: (focused, tintColor) => (<Image style={{ width:30, height: 30, marginTop: 10 }} source={require('./assets/images/notif.png')} /> )}}/>
      <Tab.Screen name="Service"  component={ServiceScreen} options={{tabBarLabel:"Service", tabBarIcon: (focused, tintColor) => (<Image style={{ width:30, height: 30, marginTop: 10 }} source={require('./assets/images/listings.png')} /> )}}/>
      <Tab.Screen name="Calendar"  component={CalendarScreen} options={{tabBarLabel:"Calendar", tabBarIcon: (focused, tintColor) => (<Image style={{ width:30, height: 30, marginTop: 10 }} source={require('./assets/images/calendar.png')} /> )}}/>
      <Tab.Screen name="Settings"  component={SettingsStack} options={{tabBarLabel:"Settings", tabBarIcon: (focused, tintColor) => (<Image style={{ width:30, height: 30, marginTop: 10 }} source={require('./assets/images/feedback.png')} /> )}}/>
  </Tab.Navigator>
      </NavigationContainer>
    );
  }





