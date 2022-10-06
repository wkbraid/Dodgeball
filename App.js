import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Knight, Circle, Brick, Counter, Move, Knight2, MoveKnight } from "./Entities.js";
import { GameEngine } from "react-native-game-engine";
import { useEffect } from 'react';
import { useOnKeyPress } from "./Key.js"
import AxisPad from 'react-native-axis-pad';

const MAXwidth = Dimensions.get('window').width;
const MAXheight = Dimensions.get('window').height;

function Gameloop(entities, { touches })  {

  for (let id in entities) {
    entities[id].core.update();
  }
return entities
}

function Create(props){
  return (
    
    <View
      style={{
        position: 'absolute',
        width: props.core.width,
        height: props.core.height,
        left: props.core.x,
        top: props.core.y,
        backgroundColor: props.core.backgroundColor,
      }}
    />
  );
}
  

var ents = {};
  //Knight and Brick run every time the game updates that is not good

  for (let i = 0; i < 10; i++) {
    let random = Math.floor(Math.random()*500) + 75
    ents[i] = { core: new Brick(random, 15), renderer: <Create /> };
  }

export default function App() {

  return (
    <GameEngine
    systems = {[Gameloop]}
    var entities = {ents}>
    <Knight2/>
    

  <View style={{left: MAXwidth/100, top: 3*MAXheight/5, backgroundcolor: "blue"}}>  
<AxisPad
    resetOnRelease={true}
    autoCenter={true}
    onValue={({ x, y }) => {
        // values are between -1 and 1
        // here insert a call to a function to move the knight entity
        // momentum would be a good thing to start thinking about
        console.log(x, y);
    }}>
    <Text>Text :( </Text>
</AxisPad>
</View>
    
    </GameEngine>
  );
}
