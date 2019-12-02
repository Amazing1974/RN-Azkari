import React, { useState, useEffect } from 'react'
import { View, Image, FlatList, StyleSheet, Platform } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
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
  }, []);

  const [userData, setUserData] = useState();

  const update = (updatedPrayers, index) => {
    const newData = userData;
    newData[index].prayers = JSON.stringify(updatedPrayers);
    setUserData(newData);
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
        onPressUser={() => props.navigation.navigate('MyPrayersScreen', { myData: userData[0].prayers, update: update })}
      />

      {/** Body Section */}
      <View style={PALETTE.center, styles.bodyWrapper}>
        <FlatList 
          data={userData}
          style={styles.flatWrapper}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item, index }) => (
            <PrayersItem 
              pName={item.userName}
              onPress={() => {
                props.navigation.navigate('PrayersListScreen', { index: index, id: item.userId, prayers: item.prayers, update: update});
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
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  bodyWrapper: {
    ...ifIphoneX(
      {
        marginBottom: 50,
      },
      Platform.OS === 'ios' && {
        marginBottom: 20,
      },
    ),
  },
  flatWrapper: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
  }
});

export default HomeScreen;