import React, { useState, useEffect } from 'react'
import { View, Image, FlatList, StyleSheet, AsyncStorage, Share } from 'react-native';
import R from '../component/R';
import HomeHeader from '../component/HomeHeader';
import PrayersItem from '../component/PrayersItem';
import Database from '../../Database';
import allPrayers from '../../assets/allPrayers';

const { COLORS, IMAGES, PALETTE } = R;

const USERS_DATA = allPrayers;
const myData = 
  {
    id: "myData",
    name: "My Prayers",
    prayers: [

    ],
  };

const db = new Database();

const HomeScreen = props => { 

  const [userData, setUserData] = useState();
  const [fontSize, setFontSize] = useState(18);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    db.initDB()
      .then(async () => {
        try {
          db.addUsersToDB(myData);
          await USERS_DATA.map(data => {
            db.addUsersToDB(data);
          });
          const data = await db.listProduct();
          setUserData(data);
        } catch (error) {
          //
        }
      })
      .catch(async () => {
        try {
          const data = await db.listProduct();
          setUserData(data);
        } catch (error) {
          // 
        }
      });
      _retrieveData();
  }, []);

  _storeData = async (value) => {
    try {
      await AsyncStorage.setItem('fSize', JSON.stringify(value))
      .then(() => {
        setFontSize(value);        
        setRefresh(!refresh);
      });
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('fSize');
      if (value == null) {
        _storeData(18);
      } else {
        setFontSize(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const update = (updatedPrayers, index, fontSize) => {
    
    _storeData(fontSize);
    const newData = userData;
    newData[index].prayers = JSON.stringify(updatedPrayers);
    setUserData(newData);
  }

  const updateFont = (fontSize) => {    
    _storeData(fontSize);
  }

  onShare = () => {
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
      <HomeHeader
        onShare={onShare}
      />

      {/** Body Section */}
      <View style={PALETTE.center, styles.bodyWrapper}>
        <FlatList 
          data={userData}
          extraData={refresh}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item, index }) => (
            <PrayersItem 
              pName={item.userName}
              onPress={() => {
                index == 0 ? (
                  props.navigation.navigate('MyPrayersScreen', { myData: userData[0].prayers, update: update, fontSize: fontSize, updateFont: updateFont, })
                ): (
                  props.navigation.navigate('PrayersListScreen', { 
                    index: index, 
                    id: item.userId, 
                    prayers: item.prayers,
                    updateFont: updateFont, 
                    userName: item.userName,
                    fontSize: fontSize,
                  })
                )
              }}
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

export default HomeScreen;