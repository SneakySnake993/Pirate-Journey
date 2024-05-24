import * as React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import {Camera, Code, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import { ErrorPage } from '../components/ErrorPage';

export default function HomeScreen({ navigation }) {
  const device = useCameraDevice('back')
  const { hasPermission, requestPermission } = useCameraPermission()

  React.useEffect(() => {
    if (!hasPermission) {
      requestPermission()
    }
  }, [hasPermission])

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes: Code[]) => {
      if (codes[0].value == "Challenge1") {
        navigation.navigate("Challenge1")
      }
    },
  })

  if (!hasPermission) return <ErrorPage error={"No camera permissions accorded."} />
  if (device == null) return <ErrorPage error={"No camera found."} />
  return (
    <View style={styles.container}>
      <Text style={styles.element}>This is Home Screen</Text>
      <Camera
        codeScanner={codeScanner}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true} />
      <Button
        title="Epreuves"
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

