import Matter from 'matter-js'
import React from 'react'
import { View } from 'react-native'
import { Dimensions } from 'react-native'

const MAXwidth = Dimensions.get('window').width;
const MAXheight = Dimensions.get('window').height;

//RENDERER
const Castle = props => {
    const widthBody = MAXwidth / 5
    const heightBody = MAXheight * 2 / 3

    const xBody = MAXwidth - widthBody
    const yBody = MAXheight - heightBody

    return (
        <View style={{
            backgroundColor: 'black',
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody
        }} />
    )
}

export default (world) => {
    let pos = { x: MAXwidth - MAXwidth / 5, y: MAXheight - (2 * MAXheight / 3) }
    const initialCastle = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        MAXwidth / 5,
        MAXheight * 2 / 3,
        {
            label: 'Castle',
            isStatic: true

        }
    )
    Matter.World.add(world, Castle)

    return {
        body: initialCastle,
        color: 'black',
        pos,
        renderer: <Castle />
    }
}