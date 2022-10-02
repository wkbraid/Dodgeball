import { StyleSheet, Text, View, Image } from 'react-native';
import { Dimensions, Keyboard } from 'react-native';
import { React, Component, useEffect } from 'react';


const MAXwidth = Dimensions.get('window').width;
const MAXheight = Dimensions.get('window').height;
let counter = 0
//if we want the screen to turn in game then this should be 
//called in the loop
// eventType onKeyDown 'w'


/*useEffect(() => {
  document.addEventListener('keydown',detectKeyDown, true)
  }, [])
  
  const detectKeyDown = (e) => {
  console.log("key pressed: ",)
  }*/

/*useEffect(() => {
  document.addEventListener('keydown',detectKeyDown, true)
  }, [])

  const detectKeyDown = (e) => {
  console.log("key pressed: ",e.key)
  }
*/

const Counter = () => {
  console.log({counter})
} 

const Move = (props) => {
  return(
//how do I check for key input
props.x += 5,
//props.x -= 5,
//props.y += 5,
//props.x -=5,
console.log("Move runs")
    );
} 

//main player character
class Knight{
  constructor(){
    this.height = 200;
    this.width = 200;
    this.backgroundColor = "blue";
    this.x = 400;
    this.y = 400;
    this.velocity = [0,0];

}


update(playerX, playerY){
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

  update(playerX, playerY) {

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
    if(this.y + this.width < playerY  || this.y > playerY + 200){
    }
    else if(this.x > playerX +200 || this.x + this.width < playerX ){

    }
    else{
      this.reverse()
      counter += 1
    }


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
    this.Move()
  } 
}
  /*let x = entity.velocity[0]
  let y = entity.velocity[1]

  entity.left += x 
  entity.top += y 

  return entity*/
  // code for moving projectiles CAN go back in Gameloop, 
  // if that makes it faster or something


export {Knight, Circle, Brick, Counter, Move, };