import { StyleSheet, Text, View, Image } from 'react-native';
import { Dimensions, Keyboard } from 'react-native';
import { React, Component, useEffect, useState, useRef, PureComponent } from 'react';
import { UseOnKeyPress, UseOnKeyRelease } from "./Key.js"
import { rectangleCollision, circleCollision, Intersection } from './Intersections.js';
import DodgeBall from "./Dodge.js"
import Matter from "matter-js"
import generateUniqueId from 'generate-unique-id';

const MAXwidth = Dimensions.get('window').width;
const MAXheight = Dimensions.get('window').height;
let playerHeight = 150
let playerWidth = 150
let input = [0, 0, 0, 0]
//      left,right,up,down (w,a,s,d) each stores a value, 0 = not pressed


class Shape extends PureComponent {
  constructor(props) {
    super(props);
    this.height = 75;
    this.width = 75;
    this.backgroundColor = "red"
    let randomNum = Math.random() * 3;
    this.momentum = [randomNum, 3 - randomNum]
  }
  update() {
    // all shapes move and have momentum
    this.x += this.momentum[0];
    this.y += this.momentum[1];
  }
}

function CreateSprite(props,) {
  return (
    <Image
      source={props.image}
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


//function to detect wasd input on computer
function KeyListeners() {
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
  UseOnKeyPress(Right, 'd')
  UseOnKeyPress(Up, 'w')
  UseOnKeyPress(Down, 's')
  UseOnKeyRelease(UndoLeft, 'a')
  UseOnKeyRelease(UndoRight, 'd')
  UseOnKeyRelease(UndoUp, 'w')
  UseOnKeyRelease(UndoDown, 's')
}

function slow(entity) {
  entity.momentum[0] *= .8
  entity.momentum[1] *= .8
}

//main player character
class Knight extends PureComponent {
  constructor(props) {
    super(props);
    this.height = playerHeight;
    this.width = playerWidth;
    this.backgroundColor = "blue";
    this.id = 'knight';
    this.x = 400;
    this.y = 400;
    this.image = require("./assets/Background.jpeg");
    this.momentum = [0, 0];
    this.renderer = <CreateSprite />;
  }

  //update knights position
  update() {
    let accelerationX = (input[1] - input[0]) / 4
    let accelerationY = (input[3] - input[2]) / 4


    this.momentum[0] += accelerationX;
    if (Math.abs(this.momentum[0]) > 4) {
      this.momentum[0] = Math.sign(this.momentum[0]) * 4
    }

    this.momentum[1] += accelerationY;
    if (Math.abs(this.momentum[1]) > 4) {
      this.momentum[1] = Math.sign(this.momentum[1]) * 4
    }
    //slow the knights velocity by a small amount (to lessen drifting)
    this.momentum[0] -= .01 * Math.sign(this.momentum[0])
    this.momentum[1] -= .01 * Math.sign(this.momentum[1])

    //check if the knight is in water, slow the knight if it is
    /* if (this.y + this.width < this.prop.ents['Water'] || this.y > WaterPosition[1] + WaterSize[1]) {
     }
     else if (this.x > WaterPosition[0] + WaterSize[0] || this.x + this.width < WaterPosition[0]) {
 
     }
     else {
       this.momentum[0] *= .8
       this.momentum[1] *= .8
     }*/
    //update the knights position 
    this.x += this.momentum[0]
    this.y += this.momentum[1]


  }
}


class Brick extends Shape {
  constructor(props) {
    super(props);
    this.x = 10;
    this.y = Math.random() * 500;
    this.id = "Brick_" + generateUniqueId();
    this.image = require("./assets/Brick.jpeg");
    this.renderer = <CreateSprite />;
  }

  update() {
    //Bouncing off walls:
    if (this.x >= (MAXwidth - this.width)) {
      this.reverse(-1, 1)
    }
    if (this.x <= 0) {
      this.reverse(-1, 1)
    }
    if (this.y >= (MAXheight - this.height)) {
      this.reverse(1, -1)
    }
    if (this.y <= 0) {
      this.reverse(1, -1)
    }

    rectangleCollision(this, this.props.ents['knight'], Intersection)

    //updating the bricks position
    super.update()
  }

  reverse(xMult, yMult) {
    this.momentum[0] = (this.momentum[0] * xMult)
    this.momentum[1] = (this.momentum[1] * yMult)
  }
}

class Circle extends Shape {
  constructor(props) {
    super(props);
    this.x = 10;
    this.y = Math.random() * 500;
    this.id = "Circle_" + generateUniqueId();
    this.borderRadius = 75 / 2;
    this.image = require("./assets/Baseball.png")
    this.renderer = <CreateSprite />;
  }

  /*render() {
    return (
      <Image
        source={this.image}
        style={{
          position: 'absolute',
          borderRadius: this.borderRadius,
          width: this.width,
          height: this.height,
          left: this.x,
          top: this.y,
          backgroundColor: this.backgroundColor,
        }}
      />
    );
  }*/

  update() {
    // change velocity to move towards knight
    this.momentum[0] += (this.props.ents['knight'].x - this.x) / 5000
    this.momentum[1] += (this.props.ents['knight'].y - this.y) / 5000
    //move
    super.update()

    //check for intersection with walls
    if (this.x >= (MAXwidth - this.width)) {
      this.reverse()
    }
    if (this.x <= 0) {
      this.reverse()
    }
    if (this.y >= (MAXheight - this.height)) {
      this.reverse()
    }
    if (this.y <= 0) {
      this.reverse()
    }

    //check for intersection with knight
    //check if there is a possible for up down
    //check if there is a possible for right left
    //check if those two things overlap
    /*
    if (this.y + this.width < this.props.ents['knight'].y || this.y > this.props.ents['knight'].y + playerHeight) {
    }
    else if (this.x > this.props.ents['knight'].x + playerWidth || this.x + this.width < this.props.ents['knight'].x) {

    }
    else {
      this.props.deleteEntity(this.id)
      //props.[Prototype].deleteEntity(this.id)
      this.props.counter += 1
    }*/

    circleCollision(this, this.props.ents['knight'])

  }
  reverse() {
    this.momentum[0] *= -1
    this.momentum[1] *= -1
  }
}


class Grenade extends Shape {
  constructor(props) {
    super(props);
    this.x = 10;
    this.y = Math.random() * 500;
    this.id = "Grenade_" + generateUniqueId();
    this.borderRadius = 75;
    this.image = require("./assets/Baseball.png")
    this.renderer = <CreateSprite />
    setTimeout(() => { this.explode(this.id, this.x, this.y) }, 2000);
  }

  explode(id, x, y) {
    //delete the original projectile
    this.props.deleteEntity(id)
    //Creates one shrapnel in each of the cardinal directions
    this.props.addEntity(new Shrapnel(this.props, [x, y, 1, 0]))
    //setTimeout(() => { DeleteEntity(id) }, 2000)
    this.props.addEntity(new Shrapnel(this.props, [x, y, 0, 1]))
    //setTimeout(() => { DeleteEntity(id) }, 2000)
    this.props.addEntity(new Shrapnel(this.props, [x, y, 0, -1]))
    //setTimeout(() => { DeleteEntity(id) }, 2000)
    this.props.addEntity(new Shrapnel(this.props, [x, y, -1, 0]))
    //setTimeout(() => { DeleteEntity(id) }, 2000)

  }



  update() {

    //Bouncing off walls:
    if (this.x >= (MAXwidth - this.width)) {
      this.reverse()
    }
    if (this.x <= 0) {
      this.reverse()
    }
    if (this.y >= (MAXheight - this.height)) {
      this.reverse()
    }
    if (this.y <= 0) {
      this.reverse()
    }

    circleCollision(this, this.props.ents['knight'])

    //updating the Grenades position
    super.update()
  }

  /*where did this come from lol
  stop() {
    this.velocityX = 0
    this.velocityY = 0
  }*/

  reverse() {
    this.momentum[0] = (this.momentum[0] * -1)
    this.momentum[1] = (this.momentum[1] * -1)
  }
}

class Shrapnel extends Shape {
  constructor(props, info) {
    super(props);
    this.id = "Shrapnel_" + generateUniqueId();
    this.borderRadius = 25;
    this.x = info[0];
    this.y = info[1];
    this.height = 25;
    this.width = 25;
    this.momentum[0] = info[2];
    this.momentum[1] = info[3];
    this.image = require("./assets/Baseball.png");
    this.renderer = <CreateSprite />
  }


  update() {
    super.update()
    this.momentum[0] += this.momentum[0] / 75
    this.momentum[1] += this.momentum[1] / 75
    circleCollision(this, this.props.ents['knight'])
  }
}

class Water extends Component {
  constructor(props) {
    super(props);
    this.id = "Water"; /* + generateUniqueId()*/
    this.borderRadius = 100 / 2;
    this.x = Math.random() * 500;
    this.y = Math.random() * 500;
    this.width = 100;
    this.height = 100;
    //this.image = "./assets/Baseball.png"
    this.renderer = <CreateSprite />
    this.backgroundColor = 'blue';
  }

  update() {
    circleCollision(this, this.props.ents['knight'], slow, true)
  }
}


export {
  Knight, Circle, Brick, KeyListeners, Grenade, Shrapnel,
  Water, slow, CreateSprite
};