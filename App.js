import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import PrayersListScreen from './src/screens/PrayersListScreen';
import MyPrayersScreen from './src/screens/MyPrayersScreen';
import EditMyPrayersScreen from './src/screens/EditMyPrayersScreen';

const routeConfig = {
  HomeScreen: {
    screen: HomeScreen,
  },
  PrayersListScreen: {
    screen: PrayersListScreen,
  },
  MyPrayersScreen: {
    screen: MyPrayersScreen,
  },
  EditMyPrayersScreen: {
    screen: EditMyPrayersScreen,
  },
}

const navigatorConfig = {
  headerMode: 'none',
};

const navigator = createStackNavigator(routeConfig, navigatorConfig);

const App = createAppContainer(navigator);

export default App;