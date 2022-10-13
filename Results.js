/* I think that the final version of this page should just be some 
animation (like a bar filling up or something) which changes
based on how many times the knight was hit */
import { StyleSheet, Text, View, Button } from 'react-native';

//navigating to a route doesnt
export default function Results({ navigation, route }) {
    return (
        <View>
            <Text>You were hit by projectiles {route.params.counter} times!</Text>
        <Button  title="Play again" onPress={() => navigation.navigate("Dodge")}/> 
        </View>
    )  
}