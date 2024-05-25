import React from 'react';
import { View, StyleSheet } from 'react-native';

export function Dot() {
  return <View style={styles.dotStyle}/>;
}

export function ActiveDot() {
  return <View style={styles.activeDotStyle}/>;
}

const styles = StyleSheet.create({
  dotStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 15,
    height: 15,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  activeDotStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 15,
    height: 15,
    borderRadius: 20,
    marginHorizontal: 8,
  },
});