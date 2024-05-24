import React from 'react';
import { Text, View, StyleSheet } from 'react-native';


export function ErrorPage({error}: {error: string}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>An error has occured...</Text>
      <Text style={styles.element}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
      fontWeight: 'bold',
      fontSize: 20,
    },
    element: {
        margin: 10,
    },
});