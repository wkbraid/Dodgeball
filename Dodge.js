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


//adds an entity given its type, if it's a Grenade set a timer for explosion
function AddEntity(entity){
let id = generateUniqueId()
ents[id] = new entity()

if(entity == Grenade){
  setTimeout(() => { Explode(id) }, 2000)
}
}

//deletes a single entity given that entities unique id
function DeleteEntity(id){
delete(ents[id])
}

//blows up the grenade
function Explode(id){
  //spawns shrapnel traveling from where the grenade blew up
  InitialShrapnel(ents[id].x,ents[id].y)
  //delete the original projectile
  DeleteEntity(id)
}

//runs 60 times a second updating each entitiy
function Gameloop(entities, { touches }, )  {
  //setTimeout is NOT what I want?
  for (let id in entities) {
    entities[id].update()
  }
  
return entities
}

//creates a square component
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
        width: props.width,
        height: props.height,
        left: props.x,
        top: props.y,
        backgroundColor: props.backgroundColor,
      }}
    />
  );
}

//creates a circle component
function CreateCircle(props){
  return (

    <View
      style={{
        position: 'absolute',
        borderRadius: props.borderRadius,
        width: props.width,
        height: props.height,
        left: props.x,
        top: props.y,
        backgroundColor: props.backgroundColor,
      }}
    />
  );
}

  //creates one shrapnel in each of the cardinal directions
  function InitialShrapnel(x, y){
          let id = generateUniqueId()
          ents[id] =  new Shrapnel(x,y,1,0) 
          setTimeout(() => { DeleteEntity(id) }, 2000)
          id = generateUniqueId()
          ents[id] = new Shrapnel(x,y,0,1)
          setTimeout(() => { DeleteEntity(id) }, 2000)
          id = generateUniqueId()
          ents[id] = new Shrapnel(x,y,0,-1)
          setTimeout(() => { DeleteEntity(id) }, 2000)
          id = generateUniqueId()
          ents[id] = new Shrapnel(x,y,-1,0)
          setTimeout(() => { DeleteEntity(id) }, 2000)
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
  //this code only runs when navigated to from the home page, why?
DeleteEntities()
ents = {knight: new Knight() };
setTimeout(TimeUp, 5000, navigation)
AddEntity(Circle)
AddEntity(Circle)
AddEntity(Brick)
AddEntity(Brick)
AddEntity(Grenade)
AddEntity(Grenade)
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

export { CreateCircle, CreateBrick }