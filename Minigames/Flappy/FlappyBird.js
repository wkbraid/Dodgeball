import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, PureComponent} from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from './FlappyIndex';
import Physics from './physics';



export default function BirdGame() {
        const [running, setRunning] = useState(false)
  
 /* useEffect(() => {
    setRunning(true)
  }, [])*/


  //let engine = entities.physics.engine

function createSlingshot() {
  var slingshotPosition = {
    x: 120,
    y: 500
  };

  var point = { x: slingshotPosition.x, y: slingshotPosition.y };
  var bird = createBird(slingshotPosition.x, slingshotPosition.y);

  var slingshot = Constraint.create({
    pointA: point,
    bodyB: bird,
    stiffness: 0.01
  });

  Matter.Events.on(engine, "afterUpdate", event => {
    if (
      mouseConstraint.mouse.button === -1 &&
      (bird.position.x > slingshotPosition.x &&
        bird.position.y < slingshotPosition.y)
    ) {
      bird = createBird(slingshotPosition.x, slingshotPosition.y);
      World.add(world, bird);
      slingshot.bodyB = bird;
    }
  });

  World.add(world, bird);
  World.add(world, slingshot);
}

//createSlingshot()
console.log(entities)
  return (
    <View style={{ flex: 1 }}>
      <GameEngine
        //ref={(ref) => { setGameEngine(ref) }}
        systems={[Physics]}
        entities={entities()}
        //running={running}

        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <StatusBar style="auto" hidden={true} />

      </GameEngine>
    </View>
  );
      }
