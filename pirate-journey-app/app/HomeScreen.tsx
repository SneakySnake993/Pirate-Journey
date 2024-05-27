import * as React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import {Camera, Code, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';

// components
import { ErrorPage } from '../components/ErrorPage';
import CustomButton from "@/components/CustomButton";
import HelpButton from "@/components/HelpButton";
import CustomModal from "@/components/CustomModal";
import getChallengesRoutes from "@/utils/getChallengesRoutes";
import { APP_STRINGS } from "@/constants/ApplicationStrings";
import getLastUnlockedChallengeIndex from "@/utils/getLastUnlockedChallenge";

export default function HomeScreen({ navigation }) {
  const device = useCameraDevice('back')
  const { hasPermission, requestPermission } = useCameraPermission()
  const [helpModalVisible, setHelpModalVisible] = React.useState(false);
  const [infoModalVisible, setInfoModalVisible] = React.useState(false);
  const [lockedChallengeModalVisible, setLockedChallengeModalVisible] = React.useState(false);

  const challengesRoutes = getChallengesRoutes();
  const lastUnlockedIndex = getLastUnlockedChallengeIndex(challengesRoutes);

  const handleHelpPress = () => {
    setHelpModalVisible(true);
  };
  
  React.useEffect(() => {
    if (!hasPermission || hasPermission === null) {
    }

  }, [])

  React.useEffect(() => {
    if (!hasPermission) {
      requestPermission()
    }
  }, [hasPermission])

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes: Code[]) => {
      challengesRoutes.map((challenge, index) => {
        if (codes[0].value === challenge && lastUnlockedIndex >= index) {
          navigation.navigate(challenge)
        } else if (codes[0].value === challenge && lastUnlockedIndex < index) {
          setLockedChallengeModalVisible(true);
        } else if (index === challengesRoutes.length - 1 && codes[0].value !== challenge) {
          setInfoModalVisible(true);
        }
      }
    )},
  })

  if (!hasPermission) return <ErrorPage error={APP_STRINGS.NO_CAMERA_PERMISSION} />
  if (device == null) return <ErrorPage error={APP_STRINGS.NO_CAMERA_DEVICE} />
  return (
    <View style={styles.container}>
      {<Camera
        codeScanner={codeScanner}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true} />}
      <HelpButton style={styles.helpButton} onPressImage={handleHelpPress}/>
      <CustomModal 
        modalVisible={helpModalVisible} 
        setModalVisible={setHelpModalVisible} 
        title={APP_STRINGS.HELP_TITLE} 
        text={APP_STRINGS.QR_CODE_HELP_TEXT} 
        />
      <CustomModal 
        modalVisible={infoModalVisible} 
        setModalVisible={setInfoModalVisible} 
        title={APP_STRINGS.INFO_TITLE} 
        text={APP_STRINGS.WRONG_QR_CODE_TEXT} 
        />
      <CustomModal
        modalVisible={lockedChallengeModalVisible}
        setModalVisible={setLockedChallengeModalVisible}
        title={APP_STRINGS.LOCKED_CHALLENGE_TITLE}
        text={APP_STRINGS.LOCKED_CHALLENGE_TEXT}
      />
      <View style={styles.cornersContainer}>
        <View style={[styles.corner, styles.topLeftCorner]} />
        <View style={[styles.corner, styles.topRightCorner]} />
        <View style={[styles.corner, styles.bottomLeftCorner]} />
        <View style={[styles.corner, styles.bottomRightCorner]} />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton title={APP_STRINGS.CHALLENGES_BUTTON_TEXT} onPress={() => navigation.navigate(APP_STRINGS.CAROUSEL_CHALLENGE_ROUTE)} />
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

