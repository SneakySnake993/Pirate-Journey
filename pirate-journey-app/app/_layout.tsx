import * as React from "react";
// import { Stack } from "expo-router";HomeScreen
import { View, Text } from 'react-native';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from "./HomeScreen";
import CarouselChallenge from "./CarouselChallenge";
import Challenge1 from "./Challenge1";
import Challenge2 from "./Challenge2";
import Challenge3 from "./Challenge3";

import lastUnlockedChallenge from '../store/lastUnlockedChallenge';

const Stack = createNativeStackNavigator();

const store = configureStore({
  reducer: {
    lastUnlockedChallenge: lastUnlockedChallenge,
  },
});

export default function RootLayout() {
  return (
    <Provider store={store}>
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CarouselChallenge" component={CarouselChallenge} />
          <Stack.Screen name="Challenge1" component={Challenge1} />
          <Stack.Screen name="Challenge2" component={Challenge2} />
          <Stack.Screen name="Challenge3" component={Challenge3} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}