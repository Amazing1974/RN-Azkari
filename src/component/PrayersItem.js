import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import R from './R';

const { PALETTE, IMAGES, COLORS } = R;

const PrayersItem = ({pName, onPress}) => {
  return (
    <TouchableOpacity
      style={[
        PALETTE.row,
        PALETTE.center,
        styles.itemWrapper,
      ]}
      onPress={onPress}  
    >
      <Text style={styles.text}>{pName}</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  itemWrapper: {
    width: '100%',
    height: 53,
    paddingHorizontal: 24,
    backgroundColor: COLORS.blue,
    borderRadius: 10,
    marginVertical: 10,
  },
  text: {
    fontSize: 14,
    color: COLORS.white,
  }
});

export default PrayersItem;