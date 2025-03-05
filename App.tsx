import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import { RootStackParamList } from './src/types';

const Stack = createNativeStackNavigator<RootStackParamList>(); // ✅ Fix: Add type here

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Mood Tracker' }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ title: 'Mood History' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
