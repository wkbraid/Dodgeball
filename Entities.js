import { StyleSheet, Text, View, Image } from 'react-native';
import { Dimensions, Keyboard } from 'react-native';
import { React, Component, useEffect, useState, useRef } from 'react';
import { useOnKeyPress } from "./Key.js"


const MAXwidth = Dimensions.get('window').width;
const MAXheight = Dimensions.get('window').height;
let counter = 0
let GlobalX = 400
let GlobalY = 400
let playerHeight = 150
let playerWidth = 150
let momentum = [0,0]

//count intersections with players
const Counter = () => {
  console.log({counter})
} 

function MoveKnight (){

//function to detect wasd input for computer
   const HandlerRight = () => {
    if(momentum[0] < 4){
    momentum[0] += 1.5
  }
  else{
    momentum[0] = 4
  }
  }
  const HandlerLeft = () => {
    if(momentum[0] > -4){
    momentum[0] -= 1.5
    }
    else{
      momentum[0] = -4
    }
  }
  const HandlerUp = () => {
    if(momentum[1] > -4){
    momentum[1] -= 1.5
    }
    else{
      momentum[1] = -4
    }
  }
  const HandlerDown = () => {
    if(momentum[1] < 4){
    momentum[1] += 1.5
    }
    else{
      momentum[1] = 4
    }
  }
    useOnKeyPress(HandlerRight,'d')
    useOnKeyPress(HandlerLeft, 'a')
    useOnKeyPress(HandlerUp, 'w')
    useOnKeyPress(HandlerDown, 's')
}

//main player character
class Knight{

  constructor(){
    this.height = playerHeight;
    this.width = playerWidth;
    this.backgroundColor = "blue";
    this.x = 400;
    this.y = 400;
    this.velocityX = 0;
    this.velocityY = 0;

}

update(){
  //update knights position
  this.x += momentum[0]
  this.y += momentum[1]

  //slow the knights velocity by a small amount (to lessen drifting)
  if(momentum[0] > 0){
    momentum[0] -= .01
  }
  if(momentum[0] < 0){
    momentum[0] += .01
  }
  if(momentum[1] > 0){
    momentum[1] -= .01
  }
  if(momentum[1] < 0){
    momentum[1] += .01
  }
  //update the knights position and record the change
  GlobalX = this.x
  GlobalY = this.y
  //return [this.x, this.y,]
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
  }

  update() {
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

  //check for player intersections  
    if(this.y + this.width < GlobalY  || this.y > GlobalY + playerHeight){
    }
    else if(this.x > GlobalX + playerWidth || this.x + this.width < GlobalX ){

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
  constructor(x, y){
    this.borderRadius = 75;
    this.x = x;
    this.y = y;
    this.height = 75;
    this.width = 75;

    let randomNum = Math.random()*3

    this.velocityX = randomNum;
    this.velocityY = 3 - randomNum;
    this.backgroundColor = 'red';
    }
  
  update() {
    // move towards knight
    this.velocityX += (GlobalX - this.x)/5000
    this.velocityY += (GlobalY - this.y)/5000
    //this.x += this.velocityX + (GlobalX - this.x)/1000;
    //this.y += this.velocityY + (GlobalY - this.y)/1000;
    this.x += this.velocityX
    this.y += this.velocityY

    //check for intersection with walls
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
    
//check for intersection with knight
//check if there is a possible for up down
//check if there is a possible for right left
//check if those two things overlap
    if(this.y + this.width < GlobalY  || this.y > GlobalY + playerHeight){
    }
    else if(this.x > GlobalX + playerWidth || this.x + this.width < GlobalX ){

    }
    else{
      this.reverse()
      counter += 1
    }

}
reverse() {
  this.velocityX = (this.velocityX * -1)
  this.velocityY = (this.velocityY * -1)
}
}
  

class Grenade {
  constructor(x, y) {
    //figure out how to set a timer when it is created and then run
    //a method when the timer is up
    this.borderRadius = 75;
    this.x = x;
    this.y = y;
    this.height = 75;
    this.width = 75;

    let randomNum = Math.random()*3

    this.velocityX = randomNum;
    this.velocityY = 3 - randomNum;
    this.backgroundColor = 'red';
  }


  update() {

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

    //check for intersections with player
    if(this.y + this.width < GlobalY  || this.y > GlobalY + playerHeight){
    }
    else if(this.x > GlobalX + playerWidth || this.x + this.width < GlobalX ){

    }
    else{
      this.reverse()
      counter += 1
    }

//updating the Grenades position
    this.x += this.velocityX;
    this.y += this.velocityY;
  }

  stop(){
    this.velocityX = 0
    this.velocityY = 0
  }

  reverse() {
    this.velocityX = (this.velocityX * -1)
    this.velocityY = (this.velocityY * -1)
  }
}

class Shrapnel{
  constructor(x,y,dX,dY){
    this.borderRadius = 25;
    this.x = x;
    this.y = y;
    this.height = 25;
    this.width = 25;
    this.velocityX = dX;
    this.velocityY = dY;
    this.backgroundColor = 'red';
  }

  update(){
    this.x += this.velocityX
    this.y += this.velocityY
    this.velocityX += this.velocityX/75
    this.velocityY += this.velocityY/75

    //preliminary checks to see if the x or y by itself rules out the
    //possibility of a collision, although is this really better?
    //perhaps the times when performance is the most important
    //IS when a collision occures
    if(this.x + this.width/2 < GlobalX || this.x - this.height/2 > GlobalX){
      return
    }
    else if(this.y + this.height/2 < GlobalY || this.y - this.height/2 > GlobalX){
      return
    }

    let x1 = GlobalX
    let y1 = GlobalY

    //check if its above or below
    if(this.y > GlobalY){
      //then it's below
      y1 = GlobalY + playerHeight
    }

    if(this.x > GlobalY){
      //then its above
      x1 = GlobalX + playerWidth
    }

    if(Math.sqrt((x1 - this.x ,2) + Math.pow( y1 - this.y ,2))){
      counter++
    }


    //check if its to the right or the left

  }
}


export {Knight, Circle, Brick, counter, MoveKnight, Grenade, Shrapnel};
