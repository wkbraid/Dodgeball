import { StyleSheet, Text, View, Button, Image, Dimensions, Pressable } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { HealthBar } from "./HealthBar.js"
import DodgeBallGame, { score, DodgeBall } from "./Dodge.js"
import { useFocusEffect } from '@react-navigation/native';
import { hookstate, useHookstate, createState } from '@hookstate/core';
// .value: Gets the value of the state
// .set(): Sets the value of the state


const MAXwidth = Dimensions.get('window').width;
const MAXheight = Dimensions.get('window').height;
//const [health, setHealth] = useState(100);
const health2 = createState(100);

export default function Battle({ navigation, route }) {
    const healthState2 = useHookstate(health2);

    if(healthState2.value <= 0){
        console.log("dead")
    }
    //function which runs when the screen is 'focused' e.g. visible
    useFocusEffect(
        React.useCallback(() => {
            healthState2.set(calculateDamage())
        }, [])
    );
    console.log(healthState2.value)

    function calculateDamage() {
        console.log(score)
        let newHealth = healthState2.value - (score * .15)
    return (newHealth)
    }


    return (
        <View style={{
            width: MAXwidth, height: MAXheight, backgroundColor: '#404040',
            position: 'relative',
        }}>

            <View style={{
                width: MAXwidth / 2, height: MAXheight,
                left: 100, top: 0
            }}>
                <HealthBar playerNum={1} health={100} />

                <Image
                    source={require("./assets/knight1.jpg")}
                    style={{
                        position: 'absolute',
                        width: MAXwidth / 10,
                        height: MAXheight / 4,
                        //left: MAXwidth / 5,
                        top: MAXheight / 3,
                        //backgroundColor: props.backgroundColor,
                    }}
                />

                <Pressable style={styles.button} onPress={() => new DodgeBall()}>
                    <Text style={styles.text}>DodgeBall</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => navigation.navigate("StormCastle")}>
                    <Text style={styles.text}>Castle</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => navigation.navigate("Matter")}>
                    <Text style={styles.text}>MatterJS</Text>
                </Pressable>
            </View>


            <View style={{
                height: MAXheight, width: MAXwidth / 2,
                position: 'absolute', left: MAXwidth / 2
            }}>
                <HealthBar playerNum={1} health={healthState2.value} />
                <Image
                    source={require("./assets/knight1.jpg")}
                    style={{
                        position: 'absolute',
                        width: MAXwidth / 10,
                        height: MAXheight / 4,
                        //left: 100,
                        top: MAXheight / 3,
                        //backgroundColor: props.backgroundColor,
                    }}
                />
            </View>
        </View>




    )
}


const styles = StyleSheet.create({
    button: {
        postion: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        //paddingVertical: 12,
        //paddingHorizontal: 32,
        //borderRadius: 4,
        // elevation: 3,
        top: (MAXheight / 1.85),
        //left: (MAXwidth / 5),
        backgroundColor: 'blue',
        height: '8%',
        width: '8%',
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        //lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',

    },
})
export { health2 }