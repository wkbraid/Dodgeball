import Matter from "matter-js";
import { getPipeSizePosPair } from "./utils/random";
import { Dimensions } from 'react-native'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const Physics = (entities, { touches, time, dispatch }) => {
    let engine = entities.physics.engine

    touches.filter(t => t.type === 'press')
        .forEach(t => {
            Matter.Body.setVelocity(entities.Bird.body, {
                x: 0,
                y: -8
            })
        })
        /*
    for (id in entities) {
        Matter.Body.translate(entities[id].body, { x: 3, y: 0 })
    }*/

    Matter.Engine.update(engine, time.delta)


    /*
            if (entities[`ObstacleTop${index}`].body.bounds.max.x <= 0) {
                const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);
    
                Matter.Body.setPosition(entities[`ObstacleTop`].body, pipeSizePos.pipeTop.pos)
                Matter.Body.setPosition(entities[`ObstacleBottom`].body, pipeSizePos.pipeBottom.pos)
    
                entities[`ObstacleTop${index}`].point = false
            }*/

    //Matter.Body.translate(entities[`ObstacleTop${index}`].body, { x: -3, y: 0 })




    /*Matter.Events.on(engine, 'collisionStart', (event) => {
         dispatch({ type: 'game_over' })
     })*/

    return entities;
}
export default Physics