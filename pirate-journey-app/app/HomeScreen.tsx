import * as React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.element}>This is Home Screen</Text>
      <Button
        title="Go to Challenge 1"
        onPress={() => navigation.navigate("Challenge1")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    element: {
        margin: 10,
    },
});

