import React, {useState} from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import { useDispatch } from "react-redux";
import { APP_STRINGS } from "@/constants/ApplicationStrings";

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
          <ImageBackground source={require("@/assets/images/challenge2.png")} style={styles.background}>
            <CannonProgressBar onChallengeDone={handleChallengeDone}/>
            <HelpButton style={styles.helpButton} onPressImage={handleHelpPress}/>
            <CustomModal 
              modalVisible={modalHelpVisible} 
              setModalVisible={setModalHelpVisible} 
              title={APP_STRINGS.HINT_TITLE} 
              text={APP_STRINGS.CHALLENGE2_HINT} 
              position={"flex-end"}
            />
            <CustomModal 
              modalVisible={modalSuccessVisible} 
              setModalVisible={setModalSuccessVisible} 
              title={APP_STRINGS.CHALLENGE2_SUCCESS_TITLE} 
              text={APP_STRINGS.CHALLENGE2_SUCCESS_TEXT} 
              onClose={handleModalClose}
              position="flex-end"
            />
          </ImageBackground> 
          : 
          <View style={styles.container}>
            <ChallengeIntro
              backgroundImage={require("@/assets/images/challenge2-intro.png")}
              introText={APP_STRINGS.CHALLENGE2_INTRO}
              helpText={APP_STRINGS.CHALLENGE2_HINT}
            />
            <View style={styles.buttonContainer}>
              <CustomButton title={APP_STRINGS.START_BUTTON_TEXT} onPress={() => setIsChallengeStarted(true)} />
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