import React, {useState} from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import { useDispatch } from "react-redux";

// Components
import CannonProgressBar from "../components/CannonProgressBar";
import ChallengeIntro from "@/components/ChallengeIntro";
import CustomModal from "@/components/CustomModal";
import CustomButton from "@/components/CustomButton";
import HelpButton from "@/components/HelpButton";

// Redux Store
import { unlock } from "@/store/lastUnlockedChallenge";

export default function Challenge2({navigation}) {
  const [isChallengeStarted, setIsChallengeStarted] = useState(false)
  const [challengeDone, setChallengeDone] = useState(false);
  const [modalHelpVisible, setModalHelpVisible] = useState(false);
  const [modalSuccessVisible, setModalSuccessVisible] = useState(false);
  const dispatch = useDispatch();

  const textIntro = "Votre supérieur est venu vous tirer de votre sommeil. Il vous demande de rejoindre le pont pour aider à la défense du navire. Il faut maintenant rechargez le canon ! Comment allez-vous vous y prendre ?";
  const helpText = "Quel mouvement feriez vous insérer la poudre dans le canon avec votre téléphone ?";
  const helpTitle = "Indice";
  const challengePassedModalTitle = 'Épreuve 2 réussie !'
  const challengePassedModalText = 'Bravo, tu as réussi l\'épreuve. Tu peux maintenant passer à l\'épreuve suivante';

  const handleModalClose = () => {
    setModalSuccessVisible(false);
    if (challengeDone) {
      navigation.navigate('Home');
    }
  }

  const handleHelpPress = () => {
    setModalHelpVisible(true);
  };

  const handleChallengeDone = () => {
    setChallengeDone(true);
    setModalSuccessVisible(true);
    dispatch(unlock(3))
  };
  
  return (
    <View style={styles.container}>
      {isChallengeStarted ? 
          <ImageBackground source={require("@/assets/images/challenge2-carousel.png")} style={styles.background}>
            <CannonProgressBar onChallengeDone={handleChallengeDone}/>
            <HelpButton style={styles.helpButton} onPressImage={handleHelpPress}/>
            <CustomModal 
              modalVisible={modalHelpVisible} 
              setModalVisible={setModalHelpVisible} 
              title={helpTitle} 
              text={helpText} 
              position={"flex-end"}
            />
            <CustomModal 
              modalVisible={modalSuccessVisible} 
              setModalVisible={setModalSuccessVisible} 
              title={challengePassedModalTitle} 
              text={challengePassedModalText} 
              onClose={handleModalClose}
              position="flex-end"
            />
          </ImageBackground> 
          : 
          <View style={styles.container}>
            <ChallengeIntro
              backgroundImage={require("@/assets/images/challenge2-intro.png")}
              introText={textIntro}
              helpText={helpText}
            />
            <View style={styles.buttonContainer}>
              <CustomButton title="Commencer" onPress={() => setIsChallengeStarted(true)} />
            </View>
          </View>
          }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  element: {
      margin: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  background: {
    flex: 1,
  },
  helpButton: {
    position: 'absolute',
    margin: "5%",
    top: "5%",
    right: 0,
    alignSelf: 'flex-end',
  }
});