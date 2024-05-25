import React, {useState, useEffect} from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Accelerometer } from 'expo-sensors';
import { NativeScreen } from "react-native-screens";
import * as Progress from 'react-native-progress';
import CannonProgressBar from "../components/CannonProgressBar";

export default function Challenge2({navigation}) {
  const [isChallengeStarted, setIsChallengeStarted] = useState(false)

  // useEffect(() => {
  //   _subscribe();
  //   setPrevData({prevX: x, prevY: y, prevZ: z});
  //   return () => _unsubscribe();
  // }, [prevX, x]);

  return (
    <View style={styles.container}>
      <Button
        title = "start challenge"
        onPress={() => (setIsChallengeStarted(true))}
      />
      {isChallengeStarted ? <CannonProgressBar/> : null}
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