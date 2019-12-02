import React, { useState, useEffect } from 'react'
import { View, Image, FlatList, StyleSheet, Platform } from 'react-native';
import R from '../component/R';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import PrayersHeader from '../component/PrayersHeader';
import PrayersDetailItem from '../component/PrayersDetailItem';
import Database from '../../Database';

const { COLORS, IMAGES, PALETTE } = R;
const db = new Database();

const PrayersListScreen = props => {

  const userID = props.navigation.getParam('id', 0);
  const PRAYERS_DETAIL_DATA = JSON.parse(props.navigation.getParam('prayers', ''));
  
  const [prayersData, setPrayersData] = useState(PRAYERS_DETAIL_DATA);
  const [fontSize, setFontSize] = useState(18);
  const [refresh, setRefresh] = useState(false);

  const setCount = index => {
    let newArr = [...prayersData];
    if (newArr[index].times > 1) {
      newArr[index].times --;
    } else {
      newArr.splice(index, 1);
    }
    db.updatePrayers(userID, newArr);
    setPrayersData(newArr);
  };

  const update = () => {
    const updateHomeData = props.navigation.getParam('update', '');
    const index = props.navigation.getParam('index', '');
    updateHomeData(prayersData, index);
    props.navigation.goBack();
  };
  
  const incTextSize = () => {
    if(fontSize < 40) {
      setFontSize(fontSize + 2);
      setRefresh(!refresh);
    }
  };

  const decTextSize = () => {
    if(fontSize > 18) {
      setFontSize(fontSize - 2); 
      setRefresh(!refresh);
    }
  };
  
  return (
    <View
      style={[
        PALETTE.body,
        {
          backgroundColor: COLORS.bluePastel,
        },
      ]}>
      
      <Image source={IMAGES.BACKGROUND} style={styles.bgImage}/>

      {/** Header Section */}
      <PrayersHeader
        onPressBack={update}
        onPressPlus={incTextSize}
        onPressMinus={decTextSize}
      />

      {/** Body Section */}
      <View style={PALETTE.center, styles.bodyWrapper}>
        <FlatList
          data={prayersData}
          extraData={refresh}
          style={styles.flatList}
          renderItem={({ item, index }) => (
            <PrayersDetailItem
              pContent={item.text}
              pCount={item.times}
              fontSize={fontSize}
              onPressCount={() => setCount(index)}
            />
          )}
        />
      </View>
    </View>
  );
}

var styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
  },
  bodyWrapper: {
    flex: 1,
  },
  flatList: {
    ...ifIphoneX(
      {
        marginBottom: 50,
      },
      Platform.OS === 'ios' && {
        marginBottom: 20,
      },
    ),
  }
});

export default PrayersListScreen;