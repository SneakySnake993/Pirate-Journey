import React, { useRef, useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Text, StyleSheet } from 'react-native';

const TypingIntroText = ({ fullText }) => {
    const [displayText, setDisplayText] = useState('');
  
    useEffect(() => {
      let textIndex = 0;
  
      // Set up a timer that updates the displayed text every 30 milliseconds
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

const styles = StyleSheet.create({
    typingText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '600',
        marginHorizontal: 35
    },
    scrollView: { 
        marginTop: 60,
        maxHeight: '40%',
    },
  });


export default TypingIntroText;