import React, {useState, useEffect} from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Accelerometer } from 'expo-sensors';
import { NativeScreen } from "react-native-screens";
import * as Progress from 'react-native-progress';


export default function Challenge2() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [prevData, setPrevData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState(null);
  const [count, setCount] = useState(0);

  
  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    Accelerometer.setUpdateInterval(1000);
    return () => _unsubscribe();
  }, [])

  useEffect(() => {
    if (hasMoved) {      
      setCount(count + 1);
    } if (count === 10) {
      return () => _unsubscribe();
    }
    setPrevData({ x: data.x, y: data.y, z: data.z });
    }, [data])

  let hasMoved = (
    Math.abs(data.x) > Math.abs(prevData.x) + 0.3 || Math.abs(data.x) < Math.abs(prevData.x) - 0.3 ||
    Math.abs(data.y) > Math.abs(prevData.y) + 0.3 || Math.abs(data.y) < Math.abs(prevData.y) - 0.3 ||
    Math.abs(data.z) > Math.abs(prevData.z) + 0.3 || Math.abs(data.z) < Math.abs(prevData.z) - 0.3)

  return (
    <View style={styles.container}>
      <Text style={styles.element}>Movements count: {count}</Text>
      <Progress.Bar progress={count / 10} width={200} />
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
