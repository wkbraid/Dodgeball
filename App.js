import Home from "./Home.js";
import Battle from "./Battle.js";
import MatterTest from "./MatterTest.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
   // let Dodge = <DodgeBall nav = {navigation}/>
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Battle"
          component={Battle}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="Matter"
          component={MatterTest}
          options={{headerShown: false}}
          />
          
      </Stack.Navigator>
    </NavigationContainer>
  );}