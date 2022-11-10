import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { health } from "./Battle.js"
import { hookstate, useHookstate, createState } from '@hookstate/core';

const MAXwidth = Dimensions.get('window').width;
const MAXheight = Dimensions.get('window').height;
let previousHealth = 0
//TODO damage of attack equals currenthealth - previoushealth
//usepreviousstate, add animation for health bar eventually
function HealthBar(props) {
  const healthState = useHookstate(health);
  let health = props.health
  if(health < 0){
    health = 0;
  }
  let maxWidth = (MAXwidth / 10)
  let maxHealth = 100
  let healthColor = getColor(health, maxHealth)
  console.log("in HealthBar.js health is: " + health)

  /*
  if(health != previousHealth){
    
    previousHealth = health
  }*/



  //TODO: increase red up to 255 to get to yellow
  //then decrease green down to 0 to get to red
  function getColor(health, maxHealth) {
    let redNeedsZero = false
    let greenNeedsZero = false
    let color = "#";

    //(100)green -> (50%)yellow -> (0%)red
    //red should change 255 in just 50 health = 5.1 per health
      let red = Math.floor((maxHealth - health) * 5.1)

      if(red > 255){
        red = 255
      }
      //anything less than 16 only converts to one hexadecimal 
      //symbol we need to add a zero in front of the digit 
      //so its recognized as hex
      else if (red < 16) {
        console.log("red needs a 0 because it is " + red)
        redNeedsZero = true
      }

      red = red.toString(16)
      if (redNeedsZero == true) {
        red = '0' + red
        redNeedsZero = false
      }

      let green = Math.floor((health) * 5.1)

      if(green > 255){
        green = 255
      }

      if (green < 16) {
        greenNeedsZero = true
      }
      green = green.toString(16)
      if (greenNeedsZero == true) {
        green = '0' + green
        greenNeedsZero = false
      }

    console.log("red " + red)
    color += red
    console.log("green " + green)
    color += green
    //blue is constant
    color += "00"
    console.log(color)

    return color;
  };


  const styles = StyleSheet.create({
    healthBar: {
      top: 0,
      left: 0,
      height: 40,
      width: maxWidth,
      backgroundColor: '#dc143c',
      borderColor: '#dc143c',
      borderWidth: 2,
      borderRadius: 5,
      position: 'absolute'
    },
    health: {
      height: 40,
      top: -2,
      left: -2,
      width: maxWidth * health / maxHealth,
      backgroundColor: healthColor,
      borderColor: '#dc143c',
      borderWidth: 2,
      borderRadius: 5,
      position: 'absolute',
    },
  });


  return (
    <View style={styles.healthBar}>
      <View style={styles.health}></View>
    </View>

  );

}


export { HealthBar }