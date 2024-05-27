import React, { useRef, useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Text, ImageBackground, StyleSheet, } from 'react-native';
import { APP_STRINGS } from '@/constants/ApplicationStrings';

import HelpButton from './HelpButton';
import CustomModal from './CustomModal';
import TypingIntroText from './TypingText';

const ChallengeIntro = ({ backgroundImage, introText, helpText }) => {

  const [modalVisible, setModalVisible] = useState(false);

  const handleHelpPress = () => {
    setModalVisible(true);
  };

  const modalPosition = 'flex-end';

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <TypingIntroText fullText={introText} />
      <HelpButton style={styles.helpButton} onPressImage={handleHelpPress}/>
      <CustomModal 
        modalVisible={modalVisible} 
        setModalVisible={setModalVisible} 
        title={APP_STRINGS.HINT_TITLE} 
        text={helpText} 
        position={modalPosition}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  helpButton: {
    position : 'absolute',
    right: 0,
    top: '50%',
    margin: 20,
  },
});

export default ChallengeIntro;