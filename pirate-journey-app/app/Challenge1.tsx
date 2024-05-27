import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
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
  const [light, setLight] = useState(null);
  const [challengeDone, setChallengeDone] = useState(false);
  const dispatch = useDispatch(); // Redux

  useEffect(() => {
    const subscription = LightSensor.addListener(({ illuminance }) => {
      setLight(illuminance);
    });

    return () => subscription && subscription.remove();
  }, []);

  useEffect(() => {
    if (light && light < 5) {
      setChallengeDone(true);
      setModalVisible(true);
      dispatch(unlock(2));
    }
  } , [light, dispatch]);
  
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
        title={APP_STRINGS.CHALLENGE2_SUCCESS_TITLE} 
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