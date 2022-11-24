import Matter from 'matter-js'
import React from 'react'
import { View, Image } from 'react-native'
import generateUniqueId from 'generate-unique-id';

const Bird = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    const xBody = props.body.position.x - widthBody /2
    const yBody = props.body.position.y - heightBody /2

    const color = props.color;

    return(
        <View style={{
            borderWidth: 1,
            borderColor: color,
            borderStyle: 'solid',
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody
        }}/>
    )
}

function birdRenderer (props)  {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    const xBody = props.body.position.x - widthBody / 2
    const yBody = props.body.position.y - heightBody / 2

    const color = 'red';

    return (
        <View style={{
            borderWidth: 1,
            borderColor: 'red',
            borderStyle: 'solid',
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody
        }} />
    )
}

export default function Birdy({world, pos, size}) {
    let position = {x: pos.x, y: pos.y}
    let id = "Dude_" + generateUniqueId();
    let width = size.width
    let height = size.height
    let color = 'red'
      //image = require("./assets/Brick.jpeg");
    //let renderer = <birdRenderer />;

    const initialBird = Matter.Bodies.rectangle(
        position.x,
        position.y,
        width,
        height,
        {
            label: 'Bird',
            isStatic: true
        }
    )
    Matter.World.add(world, initialBird)
    

    return {
        body: initialBird,
        color,
        position,
        renderer: <Bird />
    }
}