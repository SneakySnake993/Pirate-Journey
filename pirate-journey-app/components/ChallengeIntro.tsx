import React, { useRef, useState, useEffect } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { View, Text, ImageBackground, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import CustomButton from './CustomButton'; // import your CustomButton component

const TypingText = ({ fullText }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let textIndex = 0;

    // Set up a timer that updates the displayed text every 50 milliseconds
    const timer = setInterval(() => {
      setDisplayText((prevText) => prevText + fullText.charAt(textIndex));
      textIndex++;

      if (textIndex > fullText.length) {
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer); // Clean up the timer when the component unmounts
  }, [fullText]);

  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [displayText]);

  return (
    <ScrollView 
      ref={scrollViewRef}
      style={styles.scrollView}
    >
      <Text style={styles.typingText}>{displayText}</Text>
    </ScrollView>
  );
};

const HelpButton = ({ onPress }) => {
  return (
    <View style={styles.helpButton}>
      <CustomButton title="Help" onPress={onPress} />
    </View>
  );
};

const ChallengeIntro = ({ backgroundImage, introText, helpText }) => {
  const handleHelpPress = () => {
    Alert.alert('Information', helpText);
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <TypingText fullText={introText} />
      <HelpButton onPress={handleHelpPress} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  typingText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    marginHorizontal: 35
  },
  helpButton: {
    position: 'absolute', 
    right: 10, 
    bottom: 10
  },
  scrollView: { 
    marginTop: 60,
    maxHeight: '40%',
  },
});

export default ChallengeIntro;