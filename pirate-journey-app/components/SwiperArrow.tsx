import React from 'react';
import { Text, StyleSheet } from 'react-native';

export const SwiperArrowNext = () => {
  return <Text style={styles.swiperArrow}>›</Text>;
};

export const SwiperArrowPrev = () => {
  return <Text style={styles.swiperArrow}>‹</Text>;
};

const styles = StyleSheet.create({
  swiperArrow: {
    fontSize: 100,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.8)',
  },
});