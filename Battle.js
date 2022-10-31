/*TODO: 
Main battle screen, should display 2 knights with health bars and a 
button for each different ability*/

import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Dimensions, Pressable } from 'react-native';
import { HealthBar } from "./HealthBar.js"

const MAXwidth = Dimensions.get('window').width;
const MAXheight = Dimensions.get('window').height;

export default function Battle({ navigation, route }) {

    return (
        <View style={{
            width: MAXwidth, height: MAXheight, backgroundColor: '#404040',
            position: 'relative',
        }}>

            <View style={{
                width: MAXwidth / 2, height: MAXheight,
                left: 100, top: 0
            }}>
                <HealthBar playerNum={1} />

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

                <Pressable style={styles.button} onPress={() => navigation.navigate("Dodge")}>
                    <Text style={styles.text}>Test Ability</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => navigation.navigate("Dodge")}>
                    <Text style={styles.text}>Test Ability2</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => navigation.navigate("Dodge")}>
                    <Text style={styles.text}>Test Ability3</Text>
                </Pressable>
            </View>


            <View style={{
                height: MAXheight, width: MAXwidth / 2,
                position: 'absolute', left: MAXwidth / 2
            }}>
                <HealthBar playerNum={1} />
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