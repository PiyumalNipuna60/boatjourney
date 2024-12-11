import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './pages/homePage';
import GameStartPage from './pages/gameStartPage'; 
import GameEndPage from './pages/gameOverPage'; 

import '../global.css'; 
const Stack = createStackNavigator();

export default function App() {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="GameStartPage" component={GameStartPage} />
        <Stack.Screen name="GameEndPage" component={GameEndPage} />
      </Stack.Navigator>
  );
}
