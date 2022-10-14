//Displays Home Screen
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

export default function Home({ navigation }) {
    return (
        <View>
        <Button style={styles.button} title="Play" onPress={() => navigation.navigate("Dodge")}/> 
        </View>
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
    }},)