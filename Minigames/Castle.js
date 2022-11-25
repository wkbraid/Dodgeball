import { PureComponent } from "react";
import Matter from "matter-js";
import { View, Dimensions } from "react-native";
import Birdy from "./Flappy/components/Bird";
import { GameEngine } from "react-native-game-engine";
import { StatusBar } from "expo-status-bar";
import generateUniqueId from "generate-unique-id";

let MAXwidth = Dimensions.get('window').width;
let MAXheight = Dimensions.get('window').height;

export default class Castle extends PureComponent {
    constructor(props) {
        super(props)

        this.ents = {}
        this.initialX = null
        this.initialY = null
        this.score = 0
        this.attacking = 0
        this.listening = false

        // module aliases
        this.Engine = Matter.Engine,
            this.Render = Matter.Render,
            this.Runner = Matter.Runner,
            this.Mouse = Matter.Mouse,
            this.MouseConstraint = Matter.MouseConstraint,
            this.Events = Matter.Events,
            this.Bodies = Matter.Bodies,
            this.Composite = Matter.Composite,
            this.Body = Matter.Body,
            this.Constraint = Matter.Constraint;
        // create an engine
        this.engine = this.Engine.create();

        console.log(this.engine)
        // create a renderer, named renderObj to avoid overlap with 
        // the classes render runction
        this.renderObj = this.Render.create({
            element: document.body,
            engine: this.engine,
            options: {
                height: MAXheight,
                width: MAXwidth,
                background: "#00ff00",
                wireframes: false
            },
        });


        //var ground = Bodies.rectangle(MAXwidth / 2, MAXheight - 60, MAXwidth, 60, { isStatic: true });
        var castle = this.Bodies.rectangle(MAXwidth * 2 / 3, MAXheight * .8, MAXwidth / 3, MAXheight * 2 / 3, { isStatic: true })

        //creates a world
        this.world = this.engine.world
        // add all of the bodies to the world
        this.Composite.add(this.world, [castle]);
        this.addAttacker(20, 40, 40, 40)
        this.addAttacker(30, 40, 50, 50)
        //addAttacker(new Birdy({world, pos: { x: 50, y: 300 }, size: { height: 40, width: 40 }}))
        //Runner.run(engine)

        this.Render.run(this.renderObj);

        // create runner
        var runner = this.Runner.create();

        // run the engine
        this.Runner.run(runner, this.engine);

        //create mouse
        this.mouseConstraint = this.createMouse();

        setTimeout(() => {
            props.changeScreen('battle');
            props.setScore(this.score);
            delete(this);
            this.Render.stop(this.renderObj);
            //this.World.clear(this.engine.world);
            //this.Engine.clear(this.engine);
            this.renderObj.canvas.remove();
            this.renderObj.canvas = null
            //console.log(Window)
            console.log(this);
            console.log("deleted");
        }, 10000)

        addEventListener('mouseup', () => {if(this.listening) {this.launch()}})


        this.setupNewBodyCreation()
        this.createSlingshot()
        this.collisionSetup()
    }
    //main()
    render() {
        //logs castle object
        //console.log(this)
        return (
            <View style={{ backgroundColor: 'blue' }}>
                <GameEngine
                    //ref={(ref) => { setGameEngine(ref) }}
                    style={{ backgroundColor: 'blue' }}
                    systems={[this.gameLoop]}
                    entities={this}
                //running={running}
                >
                    <StatusBar style="auto" hidden={true} />

                </GameEngine>
            </View>
        );
    }


    addAttacker(x, y, height, width) {
        //TODO
        let id = generateUniqueId()
        this.ents[id] = this.Bodies.rectangle(x, y, height, width, { isStatic: true, label: 'attacker' });
        this.Composite.add(this.world, this.ents[id])
    }

    setupNewBodyCreation() {
        this.Events.on(this.mouseConstraint, "mousedown", event => {
            var source = event.source;
            var mouse = event.mouse;

            //I don't know what the first part does exactly
            if (source.body === null && mouse.position.x < (MAXwidth / 3)) {
                this.addAttacker(mouse.position.x, mouse.position.y, 20, 20);
            }
        });
    }

    launch() {
        console.log("launch runs")
        console.log(this)
        console.log(this.mouseConstraint)
        let finalX = this.mouseConstraint.mouse.position.x
        let finalY = this.mouseConstraint.mouse.position.y

        let vectorX = this.initialX - finalX
        let vectorY = this.initialY - finalY

        var bird = this.createBird(finalX, finalY)
        this.Composite.add(this.world, bird)
        this.Body.applyForce(bird, bird.position, { x: vectorX / 100, y: vectorY / 100 })

        this.listening = false
        //removeEventListener('mouseup', this.launch)
    }


    createSlingshot() {
        console.log(this)
        this.launch()

        var slingshotPosition = {
            x: MAXwidth * 2 / 3,
            y: (MAXheight / 3) + 15
        };

        var point = { x: slingshotPosition.x, y: slingshotPosition.y };
        var shownBird = this.createBird(slingshotPosition.x, slingshotPosition.y);

        var slingshot = this.Constraint.create({
            pointA: point,
            bodyB: shownBird,
            stiffness: 0.01
        });

        this.Composite.add(this.world, slingshot)

        this.Events.on(this.mouseConstraint, "mousedown", event => {
            this.initialX = event.mouse.position.x
            this.initialY = event.mouse.position.y

            if (this.initialX > (slingshotPosition.x - 10) && this.initialX < (slingshotPosition.x + 10)
                && this.initialY > (slingshotPosition.y - 10) && (this.initialY < slingshotPosition.y + 10)) {
                    this.listening = true
                }

        })

    }

    createBird(x, y) {
        var bird = this.Bodies.circle(x, y, 10, {
            mass: 10,
            label: "bird",
            render: {
                sprite: {
                    texture: "https://imgur.com/6Nmywmw.png",
                    xScale: 1 / 3.5,
                    yScale: 1 / 3.5
                }
            }
        });
        return bird;
    }

    //creates a mouseConstraint
    createMouse() {
        var mouse = this.Mouse.create(this.renderObj.canvas);
        var mouseConstraint = this.MouseConstraint.create(this.engine, {
            mouse: mouse
        });
        this.Composite.add(this.world, mouseConstraint);
        // keep the mouse in sync with rendering
        this.renderObj.mouse = mouse;
        return mouseConstraint;
    }

    collisionSetup() {
        this.Events.on(this.engine, "collisionStart", event => {
            event.pairs
                .filter(pair => {
                    return true;
                })
                .forEach(pair => {
                    console.log(pair)
                    if (pair.bodyA.label === 'bird' && pair.bodyB.label === 'attacker') {
                        this.Composite.remove(this.world, pair.bodyB)
                    }
                    if (pair.bodyB.label === 'bird' && pair.bodyA.label === 'attacker') {
                        this.Composite.remove(this.world, pair.bodyA)
                    }
                });
        });
    }

    gameLoop(castle, time) {
        //castle is NOT entities, castle is a reference 
        //to the overall castle object
        Matter.Engine.update(castle.engine, time.delta)
        //time.delta = undefined ?
        //translate takes in a Body and translates it according to the vector
        for (let id in castle.ents) {
            //console.log("there is an id!")
            Matter.Body.translate(castle.ents[id], { x: 3, y: 0 })
            if (castle.ents[id].position.x > MAXwidth / 2) {
                //console.log("an entity is deleted!")
                delete(castle.ents[id])
                //this.attacking += 1
            }
        }
        //this.score += this.attacking / 10
        return castle
    }

}