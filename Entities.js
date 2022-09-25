import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

//main player character
const Knight = (props) => {
  console.log("knight runs")
  return (
      <View style=
    {{ height: 100, width: 200, backgroundColor: "blue", 
      left: props.position[0], top: props.position[1] }} />
  );
}
//test

const Brick = (props) => {
  console.log("Brick runs") //... every time the game updates
  //let position_x = props.position[0]
  //let position_y = props.position[1]

  //position_x += props.velocity[0]
  //position_y += props.velocity[1]
return(
  <View
  style = {{height: 50, width: 50, backgroundColor: "red",
             }}
             //left: Math.floor(Math.random()*500), top: 50,
  />
)

}

const Circle = (props) => {
    return (
      <View
      style = {{ height: 100, width: 100, 
              backgroundColor: "red", borderRadius: 100/2,
              left: props.position[0], top: props.position[1]}}
                  />


    );
  }

  

export {Knight, Circle, Brick};