import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Challenge3({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.element}>This is challenge 3</Text>
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