import * as React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import {Camera, Code, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import { ErrorPage } from '../components/ErrorPage';
import CustomButton from "@/components/CustomButton";
import { Dimensions } from 'react-native';
import HelpButton from "@/components/HelpButton";
import CustomModal from "@/components/CustomModal";

export default function HomeScreen({ navigation }) {
  const device = useCameraDevice('back')
  const { hasPermission, requestPermission } = useCameraPermission()
  const [modalVisible, setModalVisible] = React.useState(false);

  const challenge1 = "Challenge1"
  const challenge2 = "Challenge2"
  const challenge3 = "Challenge3"
  const carouselChallenge = "CarouselChallenge"
  const noPermission = "Camera permissions not accorded."
  const noDevice = "Camera not found."
  const helpTitle = "Info"
  const helpText = "Scannez le QR code pour accéder à l'épreuve."

  const handleHelpPress = () => {
    setModalVisible(true);
  };

  React.useEffect(() => {
    if (!hasPermission) {
      requestPermission()
    }
  }, [hasPermission])

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes: Code[]) => {
      if (codes[0].value == challenge1) {
        navigation.navigate(challenge1)
      } else if (codes[0].value == challenge2) {
        navigation.navigate(challenge2)
      } else { navigation.navigate(challenge3)}
      }
    },
  )

  if (!hasPermission) return <ErrorPage error={noPermission} />
  if (device == null) return <ErrorPage error={noDevice} />
  return (
    <View style={styles.container}>
      {<Camera
        codeScanner={codeScanner}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true} />}
      <HelpButton style={styles.helpButton} onPressImage={handleHelpPress}/>
      <CustomModal 
        modalVisible={modalVisible} 
        setModalVisible={setModalVisible} 
        title={helpTitle} 
        text={helpText} 
        />
      <View style={styles.cornersContainer}>
        <View style={[styles.corner, styles.topLeftCorner]} />
        <View style={[styles.corner, styles.topRightCorner]} />
        <View style={[styles.corner, styles.bottomLeftCorner]} />
        <View style={[styles.corner, styles.bottomRightCorner]} />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton title="Epreuves" onPress={() => navigation.navigate(carouselChallenge)} />
      </View>
    </View>
  );
}



// Get screen dimensions
const { width, height } = Dimensions.get('window');
const verticalMargin = 0;
const horizontalMargin = 0;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  element: {
      margin: 10,
  },
  helpButton: {
    position: 'absolute',
    margin: "5%",
    top: "5%",
    right: 0,
    alignSelf: 'flex-end',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  cornersContainer: {
    position: 'absolute',
    width: '80%',
    height: width * 0.8,
  },
  corner: {
    position: 'absolute',
    borderColor: 'rgba(255, 183, 3, 0.9)',
    borderWidth: 5,
  },
  topLeftCorner: {
    top: verticalMargin,
    left: horizontalMargin,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    width: 50,
    height: 50,
  },
  topRightCorner: {
    top: verticalMargin,
    right: horizontalMargin,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    width: 50,
    height: 50,
  },
  bottomLeftCorner: {
    bottom: verticalMargin,
    left: horizontalMargin,
    borderTopWidth: 0,
    borderRightWidth: 0,
    width: 50,
    height: 50,
  },
  bottomRightCorner: {
    bottom: verticalMargin,
    right: horizontalMargin,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    width: 50,
    height: 50,
  },
});

