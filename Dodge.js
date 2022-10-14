import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import { Knight, Circle, Brick, Grenade, MoveKnight, Shrapnel, counter} from "./Entities.js";
import { GameEngine } from "react-native-game-engine";
import AxisPad from 'react-native-axis-pad';
////this looks interesting for the attacker placing/throwing projectiles:
//https://reactnative.dev/docs/panresponder 
//https://medium.com/yapsody-engineering/hooks-and-function-components-in-react-native-d4e667c90cda
var ents = {}

const generateUniqueId = require('generate-unique-id');

const MAXwidth = Dimensions.get('window').width;
const MAXheight = Dimensions.get('window').height;

//deletes a single entity given that entities unique id
function DeleteEntity(id){
delete(ents[id])
}

//blows up the grenade
function Explode(id){
  //spawns shrapnel traveling from where the grenade blew up
  InitialShrapnel(ents[id].core.x,ents[id].core.y)
  //delete the original projectile
  DeleteEntity(id)
}

function Gameloop(entities, { touches }, )  {
  //setTimeout is NOT what I want?
  for (let id in entities) {
    entities[id].core.update()
  }
  
return entities
}

function CreateBrick(props){
  return (
    /* <View style={styles.container}>
      <Image
        style={ INSERT STYLE HERE }
        source={require('@expo/snack-static/react-native-logo.png')}
      />
    */
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

function CreateGrenade(props){
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

  

ents = {knight: { core: new Knight(), renderer: <CreateBrick />},};

  function InitialCircle() {
    let random = Math.floor(Math.random()*500) + 75
    let id = generateUniqueId()
    ents[id] = { core: new Circle(random, 15), renderer: <CreateCircle /> };
  }

  function InitialBrick(){
    let random = Math.floor(Math.random()*500) + 75
    let id = generateUniqueId()
    ents[id] = { core: new Brick(random, 15), renderer: <CreateBrick />  };
  }

  function InitialGrenade(){
    let random = Math.floor(Math.random()*500) + 75
    let id = generateUniqueId()
    ents[id] = { core: new Grenade(random, 15), renderer: <CreateCircle />,}
    setTimeout(() => { Explode(id) }, 3000)
  }

  //creates one shrapnel in each of the cardinal directions
  function InitialShrapnel(x , y){
    let dY = 0
    for(let dX= -1; dX < 2; dX++){
//dX and dY are the direction the shrapnel will head in
        if(dX == 0 ){
          let id = generateUniqueId()
          ents[id] = { core: new Shrapnel(x,y,dX,-1), renderer: <CreateCircle/> }
          setTimeout(() => { DeleteEntity(id) }, 2000)
          id = generateUniqueId()
          ents[id] = { core: new Shrapnel(x,y,dX,1), renderer: <CreateCircle/> }
          setTimeout(() => { DeleteEntity(id) }, 3000)
        }
 else {
  let id = generateUniqueId()
  ents[id] = { core: new Shrapnel(x,y,dX,0), renderer: <CreateCircle/> }
  setTimeout(() => { DeleteEntity(id) }, 3000)
 }
}
}

// Navigates to the Results screen after an amount of time
// Specified by a call in the main function
function TimeUp(navigation){
  navigation.navigate("Results", {counter: counter})
}

//Deletes all entities
function DeleteEntities(){
  for(let id in ents){
    delete(ents[id])
    console.log("DeleteEntities ran")
  }
}

export default function Dodge({ navigation }) {
  //this code only runs once in the overall app
  //Does it run when navigated to or does it prerun?
DeleteEntities()
ents = {knight: { core: new Knight(), renderer: <CreateBrick />},};
setTimeout(TimeUp, 5000, navigation)
InitialBrick()
InitialCircle()
InitialGrenade()
InitialBrick()
InitialCircle()
InitialGrenade()
  return (
<View>
    <GameEngine
    systems = {[Gameloop, ] }
    var entities = {ents}>
    <MoveKnight/>

  <View style={{left: MAXwidth/100, top: 3*MAXheight/4.2, backgroundcolor: "blue"}}>  


<AxisPad
    resetOnRelease={true}
    autoCenter={true}
    size = {200}           
    handlerSize= {100}
    onValue={({ x, y }) => {
        // values are between -1 and 1
        // TODO: here insert a call to a function to move the knight entity
        //actually it might not be easy if it is an entity, because 
        //console.log(x, y); 
    }}>
    <Text>!</Text>
</AxisPad>
</View>
    
    </GameEngine>
    </View>
  );
}
