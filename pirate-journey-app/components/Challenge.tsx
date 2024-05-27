import React, { useRef, useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Text, ImageBackground, StyleSheet, } from 'react-native';

import HelpButton from './HelpButton';
import CustomModal from './CustomModal';

const Challenge = ({ backgroundImage, helpText, helpButtonStyle, challengeViewElement }) => {

  const [modalVisible, setModalVisible] = useState(false);

  const handleHelpPress = () => {
    setModalVisible(true);
  };

  const helpTitle = 'Indice';
  const modalPosition = 'flex-end';

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <HelpButton style={helpButtonStyle} onPressImage={handleHelpPress}/>
      {challengeViewElement}
      <CustomModal 
        modalVisible={modalVisible} 
        setModalVisible={setModalVisible} 
        title={helpTitle} 
        text={helpText} 
        position={modalPosition}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  }
});

export default Challenge;