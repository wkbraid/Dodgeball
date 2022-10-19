//Displays Home Screen
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, ImageBackground } from 'react-native';
import { Pressable } from 'react-native'

export default function Home({ navigation }) {
    return (
        <ImageBackground
        style={styles.background}
        source={require('./assets/Background.jpeg')}>
        <Button style={styles.button} title="Play" onPress={() => navigation.navigate("Dodge")}/> 
        <Pressable style={styles.button} onPress={() => navigation.navigate("Dodge")}>
      <Text style={styles.text}>Play</Text>
            </Pressable>
       </ImageBackground>
    )  
}
const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'black',
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
    height: '100%'
    }, })