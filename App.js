import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Knight, Circle, Brick, Counter, Move, Knight2, MoveKnight } from "./Entities.js";
import { GameEngine } from "react-native-game-engine";
import { useEffect } from 'react';
import { useOnKeyPress } from "./Key.js"



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
    
    
    </GameEngine>
  );
}
