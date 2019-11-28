import React from 'react'
import { View, Text } from 'react-native';
import R from '../component/R';
import HomeHeader from '../component/HomeHeader';

const { COLORS, IMAGES, PALETTE } = R;

const HomeScreen = () => {
  return (
    <View
      style={[
        PALETTE.body,
        {
          backgroundColor: COLORS.bluePastel,
        },
      ]}>
      
      {/** Header Section */}
      <HomeHeader />
      <Text>{'HomeScreenasdfasdfad'}</Text>
    </View>
  );
}

export default HomeScreen;