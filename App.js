import Dodge from "./Dodge.js";
import Home from "./Home.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home"
          component={Home}
        />
        <Stack.Screen 
          name="Dodge"
          component={Dodge}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}