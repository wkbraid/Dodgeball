import Dodge from "./Dodge.js";
import Home from "./Home.js";
import Results from "./Results"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Dodge"
          component={Dodge}
          options={{headerShown: false}}
        />
         <Stack.Screen 
          name="Results"
          component={Results}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}