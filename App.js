import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Knight, Circle, Brick, } from "./Entities.js";
import { GameEngine } from "react-native-game-engine";


function Gameloop(entities, { touches })  {

  let playerX = (entities['knight'].core.update())[0]
  let playerY = (entities['knight'].core.update())[1]
//playerX and playerY are both indeed 400

  for (let id in entities) {
    entities[id].core.update(parseInt(playerX), parseInt(playerY));
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
  


    
  
function collision(entities) {

}






var ents = {
  knight: { core: new Knight(), renderer: <Create /> },
};
// Knight: { core: new Knight(), renderer: <Create />}
  //Knight and Brick run every time the game updates that is not good

  for (let i = 0; i < 10; i++) {
    let random = Math.floor(Math.random()*500) + 75
    ents[i] = { core: new Brick(random, 15), renderer: <Create /> };
  }

export default function App() {

  //Thank you Will

  return (
    <GameEngine
    systems = {[Gameloop]}
    var entities = {ents}>
    </GameEngine>
  );
}
