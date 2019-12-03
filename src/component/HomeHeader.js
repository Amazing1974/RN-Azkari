import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, StatusBar, Platform } from 'react-native';
import R from './R';
import Icon from 'react-native-vector-icons/AntDesign';

const { PALETTE, IMAGES, COLORS } = R;

const HomeHeader = ({ onShare }) => {
  return (
    <View
      style={[
        PALETTE.row,
        PALETTE.primaryBetween,
        PALETTE.secondaryCenter,
        styles.header,
        Platform.OS == 'android' && {
          marginTop: StatusBar.currentHeight,
        },
      ]}>
      <Text style={styles.headerText}>{'Categories'}</Text>
      <TouchableOpacity onPress={onShare}>
        <Text>
          <Icon name="sharealt" size={20} color={COLORS.white} />
        </Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 52.8,
    paddingHorizontal: 24,
    backgroundColor: COLORS.blue,
  },
  headerText: {
    color: COLORS.white,
    fontSize: 18,
  },
});

export default HomeHeader;