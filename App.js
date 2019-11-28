import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import PrayersListScreen from './src/screens/PrayersListScreen';

const routeConfig = {
  HomeScreen: {
    screen: HomeScreen,
  },
  PrayersListScreen: {
    screen: PrayersListScreen,
  },
}

const navigatorConfig = {
  headerMode: 'none',
};

const navigator = createStackNavigator(routeConfig, navigatorConfig);

const App = createAppContainer(navigator);

export default App;