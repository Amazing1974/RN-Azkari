import React, { useState, useEffect } from 'react'
import { View, Image, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import R from '../component/R';
import EditMyPrayersHeader from '../component/EditMyPrayersHeader';
import Database from '../../Database';

const { COLORS, IMAGES, PALETTE } = R;

const db = new Database();

const EditMyPrayersScreen = props => {

  const [times, setTimes] = useState('');
  const [text, setText] = useState('');

  const flag = props.navigation.getParam('flag', 0);
  const edtData = props.navigation.getParam('data', []);
  const index = props.navigation.getParam('index', index);

  useEffect(() => {
    if (flag === 1) {
      setTimes(edtData.times);
      setText(edtData.text);
    }
  }, []);

  const submit = () => {
    if (flag == 1){
      const editSubmit = props.navigation.getParam('editSubmit', '');
      editSubmit(times, text, index);
      props.navigation.goBack();
    } else {
      const addSubmit = props.navigation.getParam('addSubmit', '');
      addSubmit(times, text);
      props.navigation.goBack();
    }
  }

  const del = () => {
    const deleteSubmit = props.navigation.getParam('deleteSubmit', '');
    deleteSubmit(index);
    props.navigation.goBack();
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
      <EditMyPrayersHeader
        onPressBack={() => props.navigation.goBack()}
        onPressMinus={() => {}}
        onPressPlus={() => {}}
      />

      {/** Body Section */}
      <View style={[PALETTE.center, {padding: 10,}]}>
       <View style={{width: '100%',}}>
        <Text style={styles.text}>{'Prayers Text'}</Text>
        <TextInput 
          style={styles.textInput}
          multiline={true}
          value={text}
          onChangeText={text => setText(text)}
        />
       </View>
       <View style={{width: '100%',}}>
        <Text style={styles.text}>{'Prayers Times'}</Text>
        <TextInput 
          style={styles.textCount} 
          keyboardType='numeric'
          value={times}
          onChangeText={text => setTimes(text)}
        />
       </View>
       <View style={PALETTE.row}>
        <TouchableOpacity onPress={submit}>
          <Text style={styles.submit}>{'Submit'}</Text>
        </TouchableOpacity>
        {
          flag == 1 ? (
            <TouchableOpacity onPress={del} style={{marginLeft: 20,}}>
              <Text style={styles.delete}>{'Delete'}</Text>
            </TouchableOpacity>
          ): (
            <View />
          )
        }
       </View>
      </View>
    </View>
  );
}

var styles = StyleSheet.create({
  submit: {
    color: 'white',
    width: 100,
    marginTop: 20,
    fontSize: 16,
    padding: 10,
    backgroundColor: COLORS.blue,
    borderRadius: 10,
    textAlign: 'center',
  },
  delete: {
    color: 'white',
    width: 100,
    marginTop: 20,
    fontSize: 16,
    padding: 10,
    backgroundColor: '#ff4000',
    borderRadius: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 16, 
    color: COLORS.blue,
  },
  textInput: {
    width: '100%', 
    height: 50, 
    backgroundColor: 'white', 
    fontSize: 16, 
    color: COLORS.blue,
    padding: 10,
    height: 150,
    justifyContent: "flex-start",
    textAlignVertical: 'top',
  },
  textCount: {
    width: '100%', 
    height: 50, 
    backgroundColor: 'white', 
    fontSize: 16, 
    color: COLORS.blue,
    paddingHorizontal: 10,
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
  },
});

export default EditMyPrayersScreen;