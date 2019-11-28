import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import R from './R';

const { PALETTE, IMAGES } = R;

const HomeHeader = () => {
  return (
    <View
      style={[
        PALETTE.row,
        PALETTE.primaryBetween,
        PALETTE.secondaryCenter,
        styles.header,
      ]}>
      <Text>{'HomeHeader'}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 52.8,
    paddingHorizontal: 24,
  },
});

export default HomeHeader;