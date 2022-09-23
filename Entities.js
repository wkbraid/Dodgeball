import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';


const Knight = (props) => {
  return (
    <View>
      <View style=
    {{ height: 100, width: 100, backgroundColor: "blue", 
      left: props.position[0], top: props.position[1] }} />
  </View>
  );
}


const Food = () => {
    return (
      <Text>Hello, I am your food!</Text>
    );
  }

export {Knight, Food,};