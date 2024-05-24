import React, {useState, useEffect} from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Accelerometer } from 'expo-sensors';

export default function Challenge2({navigation}) {

  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [{ prevX, prevY, prevZ }, setPrevData] = useState({
    prevX: 0,
    prevY: 0,
    prevZ: 0,
  });

  const [count, setCount] = useState(0);
  const [subscription, setSubscription] = useState(null);
  Accelerometer.setUpdateInterval(50);

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    setPrevData({prevX: x, prevY: y, prevZ: z});
    return () => _unsubscribe();
  }, [prevX, x]);

  useEffect(() => {
    if (Math.abs(x) > Math.abs(prevX) + 0.3 || Math.abs(x) < Math.abs(prevX) - 0.3 ||
        Math.abs(y) > Math.abs(prevY) + 0.3 || Math.abs(y) < Math.abs(prevY) - 0.3 ||
        Math.abs(z) > Math.abs(prevZ) + 0.3 || Math.abs(z) < Math.abs(prevZ) - 0.3) {
      setCount(count + 1);
    }
    console.log(prevX, x, count);
  }, [x, prevX]);

  return (
    <View style={styles.container}>
      <Text style={styles.element}>Movements count: {count}</Text>
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