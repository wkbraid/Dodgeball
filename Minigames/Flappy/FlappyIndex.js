import Matter from "matter-js"
import Bird from "./components/Bird";
import Floor from "./components/Floor";
import Obstacle from "./components/Obstacle";
import Castle from "./components/Castle"
import { Dimensions } from 'react-native'
import generateUniqueId from "generate-unique-id";

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width


export default restart => {
    //creates engine
    let engine = Matter.Engine.create({ enableSleeping: false })

    let world = engine.world

    engine.gravity.y = 0.4;
    let afuckingrandomvariable =  [Bird(world, 'green', { x: 50, y: 300 }, { height: 40, width: 40 })]
    return {
        physics: { engine, world },
        castle: Castle(world),
        afuckingrandomvariable,
        // Floor: Floor(world, 'green', { x: windowWidth / 2, y: windowHeight }, { height: 50, width: windowWidth })
    }
}