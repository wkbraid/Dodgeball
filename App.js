import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Knight, Circle, Brick, Counter, Move,  } from "./Entities.js";
import { GameEngine } from "react-native-game-engine";
import { useEffect } from 'react';



function Gameloop(entities, { touches })  {
  /*handleW = () => {
    entities['knight'].core.x += 10;
  }

  function useKey(key, cd){
    const callbackRef = useRef(cb);
  
    useEffect(()=>{
        callbackRef.current = cb;
    })
  
    useEffect(() => {
        function handle(event){
            if(event.code === key){
                callbackRef.current(event)
            }
        }
  
        document.addEventListener("keypress", handle)
        return () => document.removeEventListener("keypress", handle)
    }, [key] )
  }*/

  //Move(entities['knight'].core)
  //useKey('w', handleW)
  let playerX = (entities['knight'].core.update())[0]
  let playerY = (entities['knight'].core.update())[1]

  //Counter()

  for (let id in entities) {
    entities[id].core.update(playerX, playerY);
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
  

var ents = {
  knight: { core: new Knight(), renderer: <Create onclick = {Move}/> },
};
// Knight: { core: new Knight(), renderer: <Create />}
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
    </GameEngine>
  );
}
