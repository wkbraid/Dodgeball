import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Knight, Food } from "./Entities.js";
import { GameEngine } from "react-native-game-engine";





export default function App() {

  return (
    <GameEngine
    entities = {{
      1: {position: [100, 100], renderer: <Knight /> }
    }}>
      
    </GameEngine>
  );
}
