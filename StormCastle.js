import { StyleSheet, Text, View, Button, Image, Dimensions, Pressable } from 'react-native';
import React, { useState, useRef, useEffect, PureComponent } from 'react';
import { HealthBar } from "./HealthBar.js"
import { score } from "./Dodge.js"
import { useFocusEffect } from '@react-navigation/native';
import { hookstate, useHookstate, createState } from '@hookstate/core';


const MAXwidth = Dimensions.get('window').width;
const MAXheight = Dimensions.get('window').height;

export default class StormCastle extends PureComponent {
    constructor(props) {
        super(props);
        setTimeout(() => {this.props.battle.setScreen('battle')}, 3000)
    }
    render() {
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
}