/*TODO: 
Main battle screen, should display 2 knights with health bars and a 
button for each different ability*/

import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Dimensions, Pressable } from 'react-native';
import HealthBar from "./HealthBar.js"

const MAXwidth = Dimensions.get('window').width;
const MAXheight = Dimensions.get('window').height;

export default function Battle({ navigation, route }) {
    return (
        <View style={{
            width: MAXwidth, height: MAXheight, backgroundColor: '#404040',
            alignContent: "center", justifyContent: "center"
        }}>
            <Image
                source={require("./assets/knight1.jpg")}
                style={{
                    position: 'absolute',
                    width: MAXwidth / 10,
                    height: MAXheight / 4,
                    left: MAXwidth / 5,
                    top: MAXheight / 3,
                    //backgroundColor: props.backgroundColor,
                }}
            />

            <Image
                source={require("./assets/knight1.jpg")}
                style={{
                    position: 'absolute',
                    width: MAXwidth / 10,
                    height: MAXheight / 4,
                    left: 2 * MAXwidth / 3,
                    top: MAXheight / 3,
                    //backgroundColor: props.backgroundColor,
                }}
            />
            <View style = {{width: MAXwidth / 2,
                    height: MAXheight / 3,
                    left: MAXwidth / 5,
                    top: MAXheight / 4,}}>
                <Pressable style={styles.button} onPress={() => navigation.navigate("Dodge")}>
                    <Text style={styles.text}>Test Ability</Text>
                </Pressable>
            </View>
        </View>


    )
}


const styles = StyleSheet.create({
    button: {
        postion: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'blue',
        height: '15%',
        width: '10%',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',

    },
    background: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
})