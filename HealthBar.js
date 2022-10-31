import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

const MAXwidth = Dimensions.get('window').width;
const MAXheight = Dimensions.get('window').height;

const HealthBar = (props) => {

const styles = StyleSheet.create({
  progressBar: {
    top: 0,
    left: 0,
    height: 40,
    width: '20%',
    backgroundColor: 'green',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5
  },
});


  return (
      <View style={styles.progressBar}></View>
  );

}


export { HealthBar }