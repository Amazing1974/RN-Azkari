import React, { useState, useEffect } from 'react'
import { View, Image, Text, FlatList, StyleSheet, TouchableOpacity, Share } from 'react-native';
import R from '../component/R';
import MyPrayersHeader from '../component/MyPrayersHeader';
import MyPrayersDetailItem from '../component/MyPrayersDetailItem';
import Database from '../../Database';

const { COLORS, IMAGES, PALETTE } = R;


const db = new Database();

const MyPrayersScreen = props => {

  const MYPRAYERS_DATA = JSON.parse(props.navigation.getParam('myData', ''));
  const [prayersData, setPrayersData] = useState(MYPRAYERS_DATA);
  const [refresh, setRefresh] = useState(false);
  const [fontSize, setFontSize] = useState(props.navigation.getParam('fontSize', 0));

  const setCount = index => {
    let newArr = [...prayersData];
    if (newArr[index].times > 1) {
      newArr[index].times --;
    } else {
      newArr.splice(index, 1);
    }
    
    // db.updatePrayers('myData', newArr);
    setPrayersData(newArr);
  };

  const addSubmit = ( times, text ) => {
    const data = {times, text}
    const newArr = prayersData;
    newArr.push(data);
    db.updatePrayers('myData', newArr);

    const updateData = props.navigation.getParam('update', '');
    updateData(prayersData, 0);
    setPrayersData(newArr);
    setRefresh(!refresh);
  }
  
  const editSubmit = ( times, text, index ) => {
    const data = {times, text}
    const newArr = prayersData;
    newArr[index] = data;
    db.updatePrayers('myData', newArr);

    const updateData = props.navigation.getParam('update', '');
    updateData(prayersData, 0);
    setPrayersData(newArr);
    setRefresh(!refresh);
  }

  const deleteSubmit = ( index ) => {
    const newArr = prayersData;
    newArr.splice(index, 1);
    db.updatePrayers('myData', newArr);

    const updateData = props.navigation.getParam('update', '');
    updateData(prayersData, 0);
    setPrayersData(newArr);
    setRefresh(!refresh);
  }

  const update = () => {
    const updateFont = props.navigation.getParam('updateFont', '');
    updateFont(fontSize);
    props.navigation.goBack();
  }

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
  }

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
      <MyPrayersHeader
        onPressBack={update}
        onPressMinus={decTextSize}
        onPressPlus={incTextSize}
      />

      {/** Body Section */}
      <View style={[PALETTE.center, PALETTE.f1]}>
        <TouchableOpacity style={styles.addBtn} onPress={() => props.navigation.navigate('EditMyPrayersScreen', { addSubmit: addSubmit })}>
          <Text style={styles.text}>{'Add My New Prayers'}</Text>
        </TouchableOpacity>
        <View style={styles.flatListWrapper}>
        <FlatList
          data={prayersData}
          extraData={refresh}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item, index }) => (
            <MyPrayersDetailItem
              pContent={item.text}
              pCount={item.times}
              fontSize={fontSize}
              onShare={onShare}
              onPressCount={() => setCount(index)}
              editPrayers={() => props.navigation.navigate('EditMyPrayersScreen', { editSubmit: editSubmit, deleteSubmit, deleteSubmit, data: prayersData[index], flag: 1, index: index })}
            />
          )}
        />
        </View>
      </View>
    </View>
  );
}

var styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: 'white',
  },
  addBtn: {
    position: 'absolute',
    marginVertical: 10,
    padding: 10,
    backgroundColor: COLORS.blue,
    borderRadius: 10,
    bottom: 0,
    zIndex: 1,
  },
  bgImage: {
    marginTop: 60,
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
  },
  flatListWrapper: {
    marginTop: 10,
    marginBottom: 60,
  },
});

export default MyPrayersScreen;