import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import { Knight, Circle, Brick, Grenade, MoveKnight, Shrapnel, counter} from "./Entities.js";
import { GameEngine } from "react-native-game-engine";
import AxisPad from 'react-native-axis-pad';

//https://reactnative.dev/docs/timers.html
//this.setTimeout??
const MAXwidth = Dimensions.get('window').width;
const MAXheight = Dimensions.get('window').height;
let index = 0
var GrenadeIndices = new Map()

function Timer(i) {
  setTimeout(() => {
      console.log("Timer is called!")
      console.log(i)
      Explode(i)
  }, 4000);
}

function Explode(i){
  //spawns shrapnel coming from location
  InitialShrapnel(ents[i].core.x,ents[i].core.y)
  //delete the original projectile
  delete(ents[i])
}

function Gameloop(entities, { touches }, )  {
  //setTimeout is NOT what I want?
  for (let id in entities) {
    entities[id].core.update()
    
    //console.log(id)
    //console.log(GrenadeIndices.get(parseInt(id)))
    //delete(entities[id])
  }
  
return entities
}

function CreateBrick(props){
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

  

var ents = {knight: { core: new Knight(), renderer: <CreateBrick />},};
  //Knight and Brick run every time the game updates that is not good

  function InitialCircle() {
    let random = Math.floor(Math.random()*500) + 75
    ents[index] = { core: new Circle(random, 15), renderer: <CreateCircle /> };
    index++
  }

  function InitialBrick(){
    let random = Math.floor(Math.random()*500) + 75
    ents[index] = { core: new Brick(random, 15), renderer: <CreateBrick />  };
    index++
  }

  function InitialGrenade(){
    let random = Math.floor(Math.random()*500) + 75
    ents[index] = { core: new Grenade(random, 15), renderer: <CreateCircle />,}
    //console.log(index)
    Timer(index)
    index++
  }

  function InitialShrapnel(x , y){
    let dY = 0
    for(let dX= -1; dX < 2; dX++){
//dX and dY are the direction the shrapnel will head in
        if(dX == 0 ){
          ents[index] = { core: new Shrapnel(x,y,dX,-1), renderer: <CreateCircle/> }
  index++
  ents[index] = { core: new Shrapnel(x,y,dX,1), renderer: <CreateCircle/> }
  index++
        }
 else {
  ents[index] = { core: new Shrapnel(x,y,dX,0), renderer: <CreateCircle/> }
  index++
 }
}
}

function TimeUp(){
navigation.navigate("Results", {counter: counter})
}

export default function Dodge({ navigation }) {
setTimeout(TimeUp, 20000)
InitialBrick()
InitialCircle()
InitialGrenade()
  return (
    //{ delete(ents['2']) }
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
        // here insert a call to a function to move the knight entity
        // actually it might not be easy if it is an entity, because 
        // I would have to pass in the knight entity to the function
        // momentum would be a good thing to start thinking about
        console.log(x, y);
    }}>
    <Text>!</Text>
</AxisPad>
</View>
    
    </GameEngine>
    </View>
  );
}
