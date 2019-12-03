import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, StatusBar, Platform } from 'react-native';
import R from './R';
import Icon from 'react-native-vector-icons/AntDesign';

const { PALETTE, IMAGES, COLORS } = R;

const PrayersHeader = ({ onPressBack, onPressPlus, onPressMinus, headerTitle }) => {
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
      <TouchableOpacity onPress={onPressBack}>
        <Text>
          <Icon name="home" size={20} color={COLORS.white} />
        </Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>{headerTitle}</Text>
      <View style={PALETTE.row}>
        <TouchableOpacity onPress={onPressPlus}>
          <Text>
            <Icon name="pluscircleo" size={20} color={COLORS.white} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginLeft: 5,}} onPress = {onPressMinus}>
          <Text>
            <Icon name="minuscircleo" size={20} color={COLORS.white} />
          </Text>
        </TouchableOpacity>
      </View>
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

export default PrayersHeader;