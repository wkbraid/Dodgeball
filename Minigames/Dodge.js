import { StatusBar } from 'expo-status-bar';
import React, { Component, PureComponent } from 'react';
import { StyleSheet, Text, View, Dimensions, Button, Image } from 'react-native';
import {
  Knight, Circle, Brick, Grenade,
  Shrapnel, Water, KeyListeners
} from "../Entities.js";
import { GameEngine } from "react-native-game-engine";
import Matter from "matter-js";
import AxisPad from 'react-native-axis-pad';
////this looks interesting for the attacker placing/throwing projectiles:
//https://reactnative.dev/docs/panresponder 
//https://medium.com/yapsody-engineering/hooks-and-function-components-in-react-native-d4e667c90cda


class DodgeBall extends PureComponent {
  constructor(props) {
    super(props);
    this.score = 0
    this.ents = {}
    this.counter = 0
    //this.generateUniqueId = require('generate-unique-id');
    this.MAXwidth = Dimensions.get('window').width;
    this.MAXheight = Dimensions.get('window').height;
    this.addEntity(new Knight(this));
    this.addEntity(new Brick(this));
    this.addEntity(new Grenade(this));
    this.addEntity(new Brick(this));
    this.addEntity(new Circle(this));
    this.addEntity(new Grenade(this));
    this.addEntity(new Water(this))
    setTimeout(() => {this.props.setScore(this.score); 
    this.props.changeScreen('battle')} , 3000 )
  }


  render() {
    return (
      <View>
        <GameEngine
          systems={[this.gameLoop,]}
          var entities={this.ents}>
          <KeyListeners />
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
    this.score += 10
  }

  //runs 60 times a second updating each entitiy
  gameLoop(entities,) {
    for (let id in entities) {
      entities[id].update()
    }

    return entities
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
      <KeyListeners/>
  
      
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
export { DodgeBall }