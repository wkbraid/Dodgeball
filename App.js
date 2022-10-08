import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Knight, Circle, Brick, Triangle, Counter, Knight2, } from "./Entities.js";
import { GameEngine } from "react-native-game-engine";
import AxisPad from 'react-native-axis-pad';

const MAXwidth = Dimensions.get('window').width;
const MAXheight = Dimensions.get('window').height;


function Gameloop(entities, { touches }, )  {

  for (let id in entities) {
    entities[id].core.update()
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

function CreateCircle(props){
  return (

    <View
      style={{
        position: 'absolute',
        borderRadius: props.core.borderRadius,
        width: props.core.width,
        height: props.core.height,
        left: props.core.x,
        top: props.core.y,
        backgroundColor: props.core.backgroundColor,
      }}
    />
  );
}
  

var ents = {knight: { core: new Knight(), renderer: <Create />},
            testcircler: {core: new Circle(100,100), renderer: <CreateCircle/>}};
  //Knight and Brick run every time the game updates that is not good

  for (let i = 0; i < 5; i++) {
    let random = Math.floor(Math.random()*500) + 75
    
    ents[i] = { core: new Circle(random, 15), renderer: <CreateCircle /> };
  }

  for(let i = 5; i < 10; i++){
    let random = Math.floor(Math.random()*500) + 75
    ents[i] = { core: new Brick(random, 15), renderer: <Create />  };
  }


export default function App() {

  return (

    <GameEngine
    systems = {[Gameloop] }
    var entities = {ents}>
      <Knight2/>

  <View style={{left: MAXwidth/100, top: 3*MAXheight/4.2, backgroundcolor: "blue"}}>  
<AxisPad
    resetOnRelease={true}
    autoCenter={true}
    size = {200}           
    handlerSize= {100}
    onValue={({ x, y }) => {
        // values are between -1 and 1
        // here insert a call to a function to move the knight entity
        // actually it might not be easy if it is an entity, because 
        // I would have to pass in the knight entity to the function
        // momentum would be a good thing to start thinking about
        console.log(x, y);
    }}>
    <Text>Text :( </Text>
</AxisPad>
</View>
    
    </GameEngine>
  );
}
