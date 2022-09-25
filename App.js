import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Knight, Circle, Brick } from "./Entities.js";
import { GameEngine } from "react-native-game-engine";


function Gameloop(entities, { touches })  {
  //components = []
  for(let i = 1; i <= 1; i++){
  let entity = entities[i] 
  move(entity)
 }
return entities
}
  

function move(entity){
  
  let x = entity.velocity[0]
  let y = entity.velocity[1]

  entity.position[0] += x 
  entity.position[1] += y 
  // code for moving projectiles CAN go back in Gameloop, 
  // if that makes it faster or something
}
    
  
function collision(entities) {

}

//what is 0 indexed, and what is not?


function createProjectile(){
  <Brick/>
}

var ents = {}
  //Knight and Brick run every time the game updates that is not good
//1: {position: [500, 250], velocity: [0,0], renderer: <Knight />}

  for (let i = 1; i <= 3; i++){
    //how to add a velocity to these entities
    ents[i] = ({position:[0,0], velocity: [2,2], renderer: <Brick/>})
    console.log(i)
    //Math.floor(Math.random()*10)
  } 

export default function App() {

  //Thank you Will, ok possibly not thank you

  return (
    <GameEngine
    systems = {[Gameloop]}
    var entities = {ents}>
    </GameEngine>
  );
}
