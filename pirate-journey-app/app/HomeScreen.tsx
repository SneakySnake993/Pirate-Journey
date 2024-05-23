import * as React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.element}>This is Home Screen</Text>
      <Button
        title="Go to Carousel Challenge"
        onPress={() => navigation.navigate("CarouselChallenge")}
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

