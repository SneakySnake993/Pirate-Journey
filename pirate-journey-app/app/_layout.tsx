import * as React from "react";
// import { Stack } from "expo-router";HomeScreen
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Redux Store
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
 } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import lastUnlockedChallenge from '../store/lastUnlockedChallenge';

import HomeScreen from "./HomeScreen";
import CarouselChallenge from "./CarouselChallenge";
import Challenge1 from "./Challenge1";
import Challenge2 from "./Challenge2";
import Challenge3 from "./Challenge3";

const Stack = createNativeStackNavigator();

const rootReducer = combineReducers({
  lastUnlockedChallenge,
  // Add other reducers here
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  })
})

let persistor = persistStore(store);

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer independent={true}>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="CarouselChallenge" component={CarouselChallenge} />
            <Stack.Screen name="Challenge1" component={Challenge1} />
            <Stack.Screen name="Challenge2" component={Challenge2} />
            <Stack.Screen name="Challenge3" component={Challenge3} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}