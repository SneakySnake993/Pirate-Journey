import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Dimensions, Animated, Easing} from "react-native";
import { Magnetometer } from 'expo-sensors';
import { APP_STRINGS } from "@/constants/ApplicationStrings";

// Components
import ChallengeIntro from "@/components/ChallengeIntro";
import CustomModal from "@/components/CustomModal";
import Challenge from "@/components/Challenge";
import CustomButton from "@/components/CustomButton";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default function Challenge3({navigation}) {

  // --- Challenge start button ---
  const [challengeStarted, setChallengeStarted] = useState(false);
  const handleChallengeStart = () => {
    setChallengeStarted(true);
    setChallengeDone(false);
  }

  // --- Modal challenge done ---
  const [challengeDone, setChallengeDone] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalClose = () => {
    setModalVisible(false);
    if (challengeDone) {
      navigation.navigate('Home');
    }
  }

  useEffect(() => {
    return () => {
      // Reset the challenge state when the component is unmounted
      setChallengeStarted(false);
      setChallengeDone(false);
    };
  }, []);

  // --- Reset quand on quitte le challenge (bouton retour) ---
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      // Reset the challenge state when the user leaves the page
      setChallengeStarted(false);
      setChallengeDone(false);
    });

    return unsubscribe;
  }, [navigation]);

  // --- Magnetometer Sensor ---

  const [magnetometerData, setMagnetometerData] = useState({x: 0, y: 0, z: 0});
  const [subscription, setSubscription] = useState(null);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const lastHeading = useRef(0);


  const _subscribe = () => {
    Magnetometer.isAvailableAsync().then(
      available => {
        if (available) {
          Magnetometer.setUpdateInterval(16);
          setSubscription(Magnetometer.addListener(setMagnetometerData));
        }
      }
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
    setMagnetometerData({x: 0, y: 0, z: 0});
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  useEffect(() => {

    // Calculate the angle of the rotation in degrees
    const angle = Math.atan2(magnetometerData.y, magnetometerData.x) * (180 / Math.PI);

    // Convert the angle to compass heading
    let heading = -angle + 90;
    if (heading < 0) heading += 360;

    // Adjust the heading to avoid jumps from 360 to 0 degrees and vice versa
    const diff = heading - lastHeading.current;
    if (diff > 180) {
      heading -= 360;
    } else if (diff < -180) {
      heading += 360;
    }
    lastHeading.current = heading;

    Animated.timing(rotateAnim, {
      toValue: heading,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();

    // Check if challenge is done (Nord-Est)
    if (challengeStarted) {
      if (Math.abs(heading - 315) <= 5) { // 5 degrees tolerance
        setChallengeDone(true);
        setModalVisible(true);
      }
    }
  }, [magnetometerData]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg']
  });





  return (
    <View style={styles.container}>
      {!challengeStarted && (
        <ChallengeIntro
          backgroundImage={require("@/assets/images/challenge3-intro.png")}
          introText={APP_STRINGS.CHALLENGE3_INTRO}
          helpText={APP_STRINGS.CHALLENGE3_HINT}
        />
      )}

      {challengeStarted && (
        <Challenge
          backgroundImage={require("@/assets/images/challenge3-intro.png")}
          helpText={APP_STRINGS.CHALLENGE3_INTRO}
          helpButtonStyle={styles.helpButton}
          challengeViewElement={
            <View style={[styles.containerElement]}>
              <Animated.Image 
                source={require('../assets/images/compass.png')}
                style={[styles.image, {transform: [{rotate: spin}]}]}
              />
            </View>
          }
        />
      )}

      {!challengeStarted && (
        <View style={styles.startButtonContainer}>
            <CustomButton
              title={APP_STRINGS.START_BUTTON_TEXT}
              onPress={handleChallengeStart}
            />
        </View>
      )}


      <CustomModal 
        modalVisible={modalVisible} 
        setModalVisible={setModalVisible} 
        title={APP_STRINGS.CHALLENGE3_SUCCESS_TITLE} 
        text={APP_STRINGS.CHALLENGE3_SUCCESS_TEXT} 
        onClose={handleModalClose}
        position="flex-end"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerElement: {
    height: deviceWidth,
    alignItems: 'center',
    marginTop: 30,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  helpButton: {
    position : 'absolute',
    right: 0,
    top: '50%',
    margin: 20,
    zIndex: 1,
  },
  startButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
});