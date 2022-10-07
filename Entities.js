import { StyleSheet, Text, View, Image } from 'react-native';
import { Dimensions, Keyboard } from 'react-native';
import { React, Component, useEffect, useState, useRef } from 'react';
import { useOnKeyPress } from "./Key.js"


const MAXwidth = Dimensions.get('window').width;
const MAXheight = Dimensions.get('window').height;
let counter = 0
let GlobalX = 400
let GlobalY = 400
let momentum = [0,0]

const Counter = () => {
  console.log({counter})
} 

function Knight2 (){

//information to change , function to change = intital state
  //const[playerX, setX] = useState(GlobalX)
  //const[playerY, setY] = useState(GlobalY)

   const HandlerRight = () => {
    if(momentum[0] < 2){
    momentum[0] += .4
  }
  }
  const HandlerLeft = () => {
    if(momentum[0] > -2){
    momentum[0] -= .4
    }
  }
  const HandlerUp = () => {
    if(momentum[1] > -2){
    momentum[1] -= .4
    }
  }
  const HandlerDown = () => {
    if(momentum[1] < 2){
    momentum[1] += .4
    }
  }
  


    useOnKeyPress(HandlerRight,'d')
    useOnKeyPress(HandlerLeft, 'a')
    useOnKeyPress(HandlerUp, 'w')
    useOnKeyPress(HandlerDown, 's')



  /*return(
    <View 
      style={{
        position: 'absolute',
        width: 200,
        height: 200,
        left: playerX,
        top: playerY,
        
      }}
    />
  )*/
}

//main player character
class Knight{

  constructor(){
    this.height = 200;
    this.width = 200;
    this.backgroundColor = "blue";
    this.x = 400;
    this.y = 400;
    this.velocityX = 0;
    this.velocityY = 0;

}

update(){
  this.x += momentum[0]
  this.y += momentum[1]
  GlobalX = this.x
  GlobalY = this.y
  return [this.x, this.y,]
}
  //we call update on every entity so we something to run for knight

}


class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.backgroundColor = 'red';
    this.height = 75;
    this.width = 75;

    let randomNum = Math.random()*3

    this.velocityX = randomNum;
    this.velocityY = 3 - randomNum;
  }

  update() {

    //If the projectiles start at 0 they get stuck
    //Bouncing off walls:
    if(this.x >= (MAXwidth - this.width)){
      this.reverse()
    }
    if(this.x <= 0){
      this.reverse()
    }
    if(this.y >= (MAXheight - this.height)){
      this.reverse()
    }
    if(this.y <= 0){
      this.reverse()
    }
    
    //check for intersections with the player
//the 200 is the height and width of the player,
//hardcoded so that we dont need to pass it every time
//remember to change this if you change player dimensions!
    if(this.y + this.width < GlobalY  || this.y > GlobalY + 200){
    }
    else if(this.x > GlobalX + 200 || this.x + this.width < GlobalX ){

    }
    else{
      this.reverse()
      counter += 1
    }

//updating the bricks position

    this.x += this.velocityX;
    this.y += this.velocityY;

    

  }

  reverse() {
    this.velocityX = (this.velocityX * -1)
    this.velocityY = (this.velocityY * -1)
  }
}

class Circle {
  constructor(){
    this.backgroundColor = "red";
    this.radius = 100/2;
    //borderRadius is the thing to change
    //how to make Create accept radius, if statement could suffice, slow?
    this.x = Math.floor(Math.random()*500);
    this.y = 0;
    this.velocityX = 1;
    this.velocityY = 1;
    }
  
  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;
  } 
}
  /*let x = entity.velocity[0]
  let y = entity.velocity[1]

  entity.left += x 
  entity.top += y 

  return entity*/
  // code for moving projectiles CAN go back in Gameloop, 
  // if that makes it faster or something


export {Knight, Circle, Brick, Counter, Knight2,};