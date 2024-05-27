import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { LightSensor } from "expo-sensors";
import { useDispatch } from "react-redux";
import { APP_STRINGS } from "@/constants/ApplicationStrings";

// Components
import ChallengeIntro from "@/components/ChallengeIntro";
import CustomModal from "@/components/CustomModal";

// Redux Store
import { unlock } from "@/store/lastUnlockedChallenge";

export default function Challenge1({navigation}) {

  // --- Light sensor ---
  const [lightData, setLightData] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [challengeDone, setChallengeDone] = useState(false);
  const dispatch = useDispatch(); // Redux

  const _subscribe = () => {
    LightSensor.isAvailableAsync().then(
      available => {
        if (available) {
          setSubscription(LightSensor.addListener(setLightData));
        }
      }
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
    setLightData(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  useEffect(() => {
    if (lightData && lightData.illuminance && lightData.illuminance < 7) {
      setChallengeDone(true);
      setModalVisible(true);
      // Redux : unlock 2 if lastUnlockedChallenge < 1
      dispatch(unlock(2));
    }
  } , [lightData, dispatch]);
  
  // --- Modal ---
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalClose = () => {
    setModalVisible(false);
    if (challengeDone) {
      navigation.navigate(APP_STRINGS.HOME_SCREEN_ROUTE);
    }
  }

  return (
    <View style={styles.container}>
      <ChallengeIntro
        backgroundImage={require("@/assets/images/challenge1-intro.png")}
        introText={APP_STRINGS.CHALLENGE1_INTRO}
        helpText={APP_STRINGS.CHALLENGE1_HINT}
      />
      <CustomModal 
        modalVisible={modalVisible} 
        setModalVisible={setModalVisible} 
        title={APP_STRINGS.CHALLENGE1_SUCCESS_TITLE} 
        text={APP_STRINGS.CHALLENGE1_SUCCESS_TEXT} 
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
});