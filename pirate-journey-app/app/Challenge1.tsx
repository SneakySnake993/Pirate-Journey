import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LightSensor } from "expo-sensors";
import { useDispatch } from "react-redux";

// Components
import ChallengeIntro from "@/components/ChallengeIntro";
import CustomModal from "@/components/CustomModal";

// Redux Store
import { unlock } from "@/store/lastUnlockedChallenge";

export default function Challenge1({navigation}) {
  const textIntro = "L’alarme retentit, le bateau se fait attaqué. Vous devez rejoindre le pont au plus vite, cependant vous préférez vous reposez dans la cale du navire. Mais la lumière vous empêche de dormir. Que faire ?"
  const helpText = "Trouve un moyen réduire la luminosité autour de ton téléphone.";
  const challengePassedModalTitle = 'Épreuve 1 réussie !';
  const challengePassedModalText = 'Bravo, tu as réussi l\'épreuve. Tu peux maintenant passer à l\'épreuve suivante';

  // --- Light sensor ---
  const [light, setLight] = useState(null);
  const [challengeDone, setChallengeDone] = useState(false);
  const dispatch = useDispatch(); // Redux

  useEffect(() => {
    const subscription = LightSensor.addListener(({ illuminance }) => {
      setLight(illuminance);
      console.log(illuminance);
    });

    return () => subscription && subscription.remove();
  }, []);

  useEffect(() => {
    if (light && light < 5) {
      console.log('Challenge 1 done !');
      setChallengeDone(true);
      setModalVisible(true);
      // Redux : unlock 2 if lastUnlockedChallenge < 1
      dispatch(unlock(2));
    }
  } , [light, dispatch]);
  
  // --- Modal ---
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalClose = () => {
    setModalVisible(false);
    if (challengeDone) {
      navigation.navigate('Home');
    }
  }

  return (
    <View style={styles.container}>
      <ChallengeIntro
        backgroundImage={require("@/assets/images/challenge1-intro.png")}
        introText={textIntro}
        helpText={helpText}
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
});