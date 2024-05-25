import React, { useRef, useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Text, ImageBackground, StyleSheet, } from 'react-native';

import HelpButton from './HelpButton';
import HelpModal from './HelpModal';
import TypingIntroText from './TypingText';

const ChallengeIntro = ({ backgroundImage, introText, helpText }) => {

  const [modalVisible, setModalVisible] = useState(false);

  const handleHelpPress = () => {
    setModalVisible(true);
  };

  const helpTitle = 'Indice';

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <TypingIntroText fullText={introText} />
      <HelpButton style={styles.helpButton} onPressImage={handleHelpPress}/>
      <HelpModal modalVisible={modalVisible} setModalVisible={setModalVisible} helpTitle={helpTitle} helpText={helpText} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  helpButton: {
    margin: 20,
    alignSelf: 'flex-end',
  }
});

export default ChallengeIntro;