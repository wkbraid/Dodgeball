import { StatusBar } from 'expo-status-bar';
import React, { Component, PureComponent } from 'react';
import { StyleSheet, Text, View, Dimensions, Button, Image } from 'react-native';
import {
  Knight, Circle, Brick, Grenade, MoveKnight,
  Shrapnel, Water
} from "./Entities.js";
import { GameEngine } from "react-native-game-engine";
import Matter from "matter-js";
import AxisPad from 'react-native-axis-pad';
////this looks interesting for the attacker placing/throwing projectiles:
//https://reactnative.dev/docs/panresponder 
//https://medium.com/yapsody-engineering/hooks-and-function-components-in-react-native-d4e667c90cda

export default function DodgeBallGame({ navigation }) {
  setTimeout(() => { navigation.navigate("Results", {counter: 'whee'})}, 20000)
  return (
      <DodgeBall/>
  )  
}

class DodgeBall extends PureComponent {
  constructor(props) {
    super(props);
    this.ents = {}
    this.counter = 0
    const generateUniqueId = require('generate-unique-id');
    this.MAXwidth = Dimensions.get('window').width;
    this.MAXheight = Dimensions.get('window').height;
    //this.deleteEntity = this.deleteEntity.bind(this)
    this.addEntity(new Knight(this));
    //this.addEntity(new Circle(this));
    this.addEntity(new Brick(this));
    this.addEntity(new Grenade(this));
    this.addEntity(new Brick(this));
    this.addEntity(new Circle(this));
    this.addEntity(new Grenade(this));
    this.addEntity(new Water(this))


  }

  // this.isLetterInWord = this.isLetterInWord.bind(this);


  render() {
    return (
      <View>
        <GameEngine
          systems={[this.gameLoop,]}
          var entities={this.ents}>
          <MoveKnight />
        </GameEngine>
      </View>
    );
  }

  //adds an entity given its type, if it's a Grenade set a timer for explosion
  addEntity(entity) {
    this.ents[entity.id] = entity
  }

  //deletes a single entity given that entities unique id
  deleteEntity(id) {
    delete (this.ents[id])
  }

  //blows up the grenade
  explode(id) {
    //spawns shrapnel traveling from where the grenade blew up
    initialShrapnel(this.ents[id].x, this.ents[id].y)
    //delete the original projectile
    deleteEntity(id)
  }

  //runs 60 times a second updating each entitiy
  gameLoop(entities, { touches },) {
    let toDelete = []
    for (let id in entities) {
      entities[id].update()
    }

    return entities
  }

  //Creates a square component
  CreateBrick(props) {
    return (
      //Having a dynamic call as in props.Image produces the error
      //Cannot find module './assets/Brick.jpeg'; which doesn't seem right
      <Image source={require("./assets/Brick.jpeg")}
        style={{
          position: 'absolute',
          width: props.width,
          height: props.height,
          left: props.x,
          top: props.y,
          backgroundColor: props.backgroundColor,
        }} />
    );
  }


  CreateKnight(props) {
    return (

      <Image source={require("./assets/Background.jpeg")}
        style={{
          position: 'absolute',
          width: props.width,
          height: props.height,
          left: props.x,
          top: props.y,
          id: props.id,
          backgroundColor: props.backgroundColor,
        }} />
    );
  }

  CreateCircle(props) {
    return (
      <Image
        source={require("./assets/Baseball.png")}
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


  // Navigates to the Results screen after an amount of time
  // Specified by a call in the main function
  timeUp(navigation) {
    navigation.navigate("Results", { counter: this.counter })
  }

  //Deletes all entities
  deleteEntities() {
    for (let id in this.ents) {
      delete (this.ents[id])
      console.log("DeleteEntities ran")
    }
  }

  Counter = () => {
    console.log(this.counter)
  }


  /*
  export default function Dodge({ navigation }) {
    //this code only runs when navigated to from the home page, why?
  deleteEntities()
  ents = {knight: new Knight() };
  setTimeout(timeUp, 10000, navigation)
  addEntity(new Circle())
  addEntity(new Circle())
  addEntity(new Brick())
  addEntity(new Brick())
  addEntity(new Grenade())
  addEntity(new Grenade())
  addEntity(new Water())
    return (
  <View>
      <GameEngine
      systems = {[gameLoop, ] }
      var entities = {ents}>
      <MoveKnight/>
  
      
      </GameEngine>
      </View>
    );
  }
  /* Code for Joystick, should in the GameEngine tag
  <View style={{left: MAXwidth/100, top: 3*MAXheight/4.2, backgroundcolor: "blue"}}>  
  <AxisPad
    //  resetOnRelease={true}
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
  </View> */
}