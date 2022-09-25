import React, { Component, } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Dimensions } from 'react-native';

const MAXwidth = Dimensions.get('window').width;
const MAXheight = Dimensions.get('window').height;
//if we want the screen to turn in game then this should be 
//called in the loop

//main player character
class Knight{
  constructor(){
    this.height = 200;
    this.width = 200;
    this.backgroundColor = "blue";
    this.x = 400;
    this.y = 400;
    this.velocity = [0,0];
    //console.log("Knight runs");

}
update(){
  //we call update on every entity so we something to run for knight
}
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
    //console.log("Brick constructor runs")
  }

  update() {
    //console.log("Brick update runs")
    
    //If the projectiles start at 0 they get stuck
    //Bouncing:
    if(this.x >= MAXheight){
      this.velocityX = (this.velocityX * -1)
      this.velocityY = (this.velocityY * -1)
    }
    if(this.x <= 0){
      this.velocityX = (this.velocityX * -1)
      this.velocityY = (this.velocityY * -1)
    }
    if(this.y >= MAXheight){
      this.velocityX = (this.velocityX * -1)
      this.velocityY = (this.velocityY * -1)
    }
    if(this.y <= 0){
      this.velocityX = (this.velocityX * -1)
      this.velocityY = (this.velocityY * -1)
    }

    this.x += this.velocityX;
    this.y += this.velocityY;

    

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
    //console.log("Circle update runs");
    this.x += this.velocityX;
    this.y += this.velocityY;
    //Move(this)
  } 
}
  /*let x = entity.velocity[0]
  let y = entity.velocity[1]

  entity.left += x 
  entity.top += y 

  return entity*/
  // code for moving projectiles CAN go back in Gameloop, 
  // if that makes it faster or something


export {Knight, Circle, Brick,};