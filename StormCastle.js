import { StyleSheet, Text, View, Button, Image, Dimensions, Pressable } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { HealthBar } from "./HealthBar.js"
import { score } from "./Dodge.js"
import { useFocusEffect } from '@react-navigation/native';
import { hookstate, useHookstate, createState } from '@hookstate/core';


const MAXwidth = Dimensions.get('window').width;
const MAXheight = Dimensions.get('window').height;

export default function StormCastle({ navigation, route }) {

    return (
        <View style={{
            width: MAXwidth, height: MAXheight, backgroundColor: '#404040',
            position: 'relative',
        }}>

                <Image
                    source={require("./assets/Castle.png")}
                    style={{
                        position: 'absolute',
                        width: MAXwidth,
                        height: MAXheight / 5,
                        backgroundColor:'#FF0000'

                    }}
                />

            </View>
    )
}