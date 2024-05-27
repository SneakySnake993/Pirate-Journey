import React, { useEffect, useState, useRef } from "react";
import { Image, StyleSheet, Text, View, Dimensions, Button, Animated, ScrollView, PanResponder, Easing} from "react-native";
import { useDispatch } from "react-redux";
import { Magnetometer } from 'expo-sensors';

// Components
import ChallengeIntro from "@/components/ChallengeIntro";
import CustomModal from "@/components/CustomModal";

// Redux Store
import { unlock } from "@/store/lastUnlockedChallenge";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
const imageWidth = 300;
const imageHeight = 300;

export default function Challenge3({navigation}) {
  const textIntro = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur";
  const helpText = "Voici l'indice du Challenge 3, bonne chance !";
  const challengePassedModalTitle = 'Épreuve 3 réussie !';
  const challengePassedModalText = 'Bravo, tu as réussi l\'épreuve 3.\nTu es maintenant un vrai pirate !\nÀ la revoyure moussaillon !';
  const [challengeDone, setChallengeDone] = useState(false);

  // --- Modal ---
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalClose = () => {
    setModalVisible(false);
    if (challengeDone) {
      navigation.navigate('Home');
    }
  }

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
          console.log("Subscribed to magnetometer");
        }
      }
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
    setMagnetometerData({x: 0, y: 0, z: 0});
    console.log("Unsubscribed to magnetometer");
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  useEffect(() => {
    console.log("Magnetometer data: " + magnetometerData.x + ", " + magnetometerData.y + ", " + magnetometerData.z);

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
  }, [magnetometerData]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg']
  });





  return (
    <View style={styles.container}>
      <ChallengeIntro
        backgroundImage={require("@/assets/images/challenge3-intro.png")}
        introText={textIntro}
        helpText={helpText}
      />
    
      <Animated.Image 
          source={require('../assets/images/compass.png')}
          style={[styles.image, {transform: [{rotate: spin}]}]}
      />

      <CustomModal 
        modalVisible={modalVisible} 
        setModalVisible={setModalVisible} 
        title={challengePassedModalTitle} 
        text={challengePassedModalText} 
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
  image: {
    width: imageWidth,
    height: imageHeight,
    zIndex: 1,
  },
});