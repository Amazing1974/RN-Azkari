import React, { useState, useEffect } from 'react'
import { View, Image, FlatList, StyleSheet, Share } from 'react-native';
import R from '../component/R';
import PrayersHeader from '../component/PrayersHeader';
import PrayersDetailItem from '../component/PrayersDetailItem';
import Database from '../../Database';

const { COLORS, IMAGES, PALETTE } = R;
const db = new Database();

const PrayersListScreen = props => {

  const userID = props.navigation.getParam('id', 0);
  const userName = props.navigation.getParam('userName', '');
  const PRAYERS_DETAIL_DATA = JSON.parse(props.navigation.getParam('prayers', ''));
  
  const [prayersData, setPrayersData] = useState(PRAYERS_DETAIL_DATA);
  const [fontSize, setFontSize] = useState(props.navigation.getParam('fontSize', 0));
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
    updateHomeData(prayersData, index, fontSize);
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

  const onShare = () => {
    Share.share({
      message: `Azkari App تطبيق أذكاري  
      https://play.google.com/store/apps/details?id=www.akfaa.co.azkari`,
      title: 'Share with'
    });
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
        headerTitle={userName}
      />

      {/** Body Section */}
      <View style={PALETTE.center, styles.bodyWrapper}>
        <FlatList
          data={prayersData}
          extraData={refresh}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item, index }) => (
            <PrayersDetailItem
              pContent={item.text}
              pCount={item.times}
              fontSize={fontSize}
              onShare={onShare}
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
    marginTop: 60,
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
  },
  bodyWrapper: {
    flex: 1,
  },
});

export default PrayersListScreen;