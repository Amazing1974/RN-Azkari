import React, { useState, useEffect } from 'react'
import { View, Image, Text, FlatList, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import R from '../component/R';
import MyPrayersHeader from '../component/MyPrayersHeader';
import MyPrayersDetailItem from '../component/MyPrayersDetailItem';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import Database from '../../Database';

const { COLORS, IMAGES, PALETTE } = R;


const db = new Database();

const MyPrayersScreen = props => {

  const MYPRAYERS_DATA = JSON.parse(props.navigation.getParam('myData', ''));
  const [prayersData, setPrayersData] = useState(MYPRAYERS_DATA);
  const [refresh, setRefresh] = useState(false);
  const [fontSize, setFontSize] = useState(18);

  const setCount = index => {
    let newArr = [...prayersData];
    if (newArr[index].times > 1) {
      newArr[index].times --;
    } else {
      newArr.splice(index, 1);
    }
    db.updatePrayers('myData', newArr)
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

  const update = () => {
    const updateData = props.navigation.getParam('update', '');
    updateData(prayersData, 0);
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
      <View style={[PALETTE.center,PALETTE.f1, {marginTop: 30,}]}>
        <TouchableOpacity style={styles.addBtn} onPress={() => props.navigation.navigate('EditMyPrayersScreen', { addSubmit: addSubmit })}>
          <Text style={styles.text}>{'Add My New Prayers'}</Text>
        </TouchableOpacity>
        <View>
        <FlatList
          data={prayersData}
          extraData={refresh}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item, index }) => (
            <MyPrayersDetailItem
              pContent={item.text}
              pCount={item.times}
              fontSize={fontSize}
              onPressCount={() => setCount(index)}
              editPrayers={() => props.navigation.navigate('EditMyPrayersScreen', { editSubmit: editSubmit, data: prayersData[index], flag: 1, index: index })}
            />
          )}
        />
        </View>
      </View>
    </View>
  );
}

var styles = StyleSheet.create({
  flatList: {
    width: 200,
    ...ifIphoneX(
      {
        marginBottom: 50,
      },
      Platform.OS === 'ios' && {
        marginBottom: 20,
      },
    ),
  },
  text: {
    fontSize: 14,
    color: 'white',
  },
  addBtn: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: COLORS.blue,
    borderRadius: 10,
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
  },
});

export default MyPrayersScreen;