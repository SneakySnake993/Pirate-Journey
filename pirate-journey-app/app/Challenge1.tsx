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
  const textIntro = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur";
  const helpText = "Voici l'indice du Challenge 1, bonne chance !";
  const challengePassedModalTitle = 'Épreuve 1 réussie !';
  const challengePassedModalText = 'Bravo, tu as réussi l\'épreuve 1. Tu peux maintenant passer à l\'épreuve suivante';

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
      console.log('Challenge 1 done !');
      setChallengeDone(true);
      setModalVisible(true);
      dispatch(unlock(2)); // Redux : unlock next challenge
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