import { StyleSheet, Text, View, Image } from 'react-native';
import { Dimensions, Keyboard } from 'react-native';
import { React, Component, useEffect, useState, useRef } from 'react';
import { UseOnKeyPress, UseOnKeyRelease } from "./Key.js"
import { CreateCircle, CreateBrick, DeleteEntity } from "./Dodge.js"


const MAXwidth = Dimensions.get('window').width;
const MAXheight = Dimensions.get('window').height;
let counter = 0
let GlobalX = 400
let GlobalY = 400
let playerHeight = 150
let playerWidth = 150
let input = [0,0,0,0]
//      left,right,up,down (w,a,s,d) each stores a value, 0 = not pressed

//count intersections with players
const Counter = () => {
  console.log({counter})
} 

//function to detect wasd input on computer
function MoveKnight (){
  const Left = () => {
    input[0] = 1.5
  }
  const Right = () => {
    input[1] = 1.5  
  }
  const Up = () => {
    input[2] = 1.5
  }
  const Down = () => {
    input[3] = 1.5
  }
  const UndoLeft = () => {
    input[0] = 0
  }
  const UndoRight = () => {
    input[1] = 0  
  }
  const UndoUp = () => {
    input[2] = 0
  }
  const UndoDown = () => {
    input[3] = 0
  }
  UseOnKeyPress(Left, 'a')
  UseOnKeyPress(Right,'d')
  UseOnKeyPress(Up, 'w')
  UseOnKeyPress(Down, 's')
  UseOnKeyRelease(UndoLeft,'a')
  UseOnKeyRelease(UndoRight,'d')
  UseOnKeyRelease(UndoUp, 'w')
  UseOnKeyRelease(UndoDown, 's')
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
    this.Image = "./assets/Background.jpeg";
    this.renderer = <CreateBrick/>;
    this.momentum = [0,0];
}

//update knights position
update(){
  let horizontal = input[1] - input[0]
  let vertical = input[3] - input[2]
  if(Math.abs(this.momentum[0] + horizontal/4) > 4){
    this.momentum[0] = Math.sign(this.momentum[0]) * 4
  }
  else{
    this.momentum[0] += horizontal/4
  }
  if(Math.abs(this.momentum[1] + vertical/4) > 4){
    this.momentum[1] = Math.sign(this.momentum[1]) * 4
  }
  else{
    this.momentum[1] += vertical/4
  }
  //slow the knights velocity by a small amount (to lessen drifting)
  this.momentum[0] -= .01 * Math.sign(this.momentum[0])
  this.momentum[1] -= .01 * Math.sign(this.momentum[1])

  this.x += this.momentum[0]
  this.y += this.momentum[1]
  //update the knights position and record the change
  GlobalX = this.x
  GlobalY = this.y
}
}


class Brick {
  constructor(id) {
    this.id = id;
    let x = Math.random()*500;
    let y = 5;
    this.x = x;
    this.y = y;
    this.backgroundColor = 'red';
    this.height = 75;
    this.width = 75;
    this.Image = "./assets/Brick.jpeg";
    this.renderer = <CreateBrick/>;
    let randomNum = Math.random()*3;
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
      DeleteEntity(this.id)
      counter += 1
    }

//updating the bricks position
    this.x += this.velocityX;
    this.y += this.velocityY;
  }
// TODO learn to use matterjs to handle collisions and possibly movement
  reverse() {
    this.velocityX = (this.velocityX * -1)
    this.velocityY = (this.velocityY * -1)
  }
}

class Circle {
  constructor(id){
    this.id = id;
    let x = 5
    let y = Math.random()*500
    this.borderRadius = 75;
    this.x = x;
    this.y = y;
    this.height = 75;
    this.width = 75;
    this.renderer = <CreateCircle/>
    let randomNum = Math.random()*3

    this.velocityX = randomNum;
    this.velocityY = 3 - randomNum;
    this.backgroundColor = 'red';
    }
  
  update() {
    // change velocity to move towards knight
    this.velocityX += (GlobalX - this.x)/5000
    this.velocityY += (GlobalY - this.y)/5000
    //move
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
      DeleteEntity(this.id)
      counter += 1
    }

}
reverse() {
  this.velocityX = (this.velocityX * -1)
  this.velocityY = (this.velocityY * -1)
}
}
  

class Grenade {
  constructor(id) {
    this.id = id
    this.borderRadius = 75;
    let x = 5
    let y = Math.random()*500
    this.x = x;
    this.y = y;
    this.height = 75;
    this.width = 75;
    this.renderer = <CreateCircle/>

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
      DeleteEntity(this.id)
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
  constructor(x,y,dX,dY,id){
    this.id = id
    this.borderRadius = 25;
    this.x = x;
    this.y = y;
    this.height = 25;
    this.width = 25;
    this.velocityX = dX;
    this.velocityY = dY;
    this.renderer = <CreateCircle/>
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