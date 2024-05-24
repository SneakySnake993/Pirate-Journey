import React, { useState } from 'react';
import { View, Image, Button, StyleSheet, Dimensions} from 'react-native';
import { useSelector } from 'react-redux';
import Swiper from 'react-native-swiper';
import lastUnlockedChallenge from '@/store/lastUnlockedChallenge';

import CustomButton from '@/components/CustomButton';

const challenges = [
  { title: 'Challenge1', image: require('../assets/images/react-logo.png') },
  { title: 'Challenge2', image: require('../assets/images/react-logo.png') },
  { title: 'Challenge3', image: require('../assets/images/react-logo.png') },
];

function ChallengeItem({ item, index, navigation, lastUnlockedIndex }) {
  return (
    <View key={index} style={styles.container}>
      <Image source={item.image} style={styles.image} resizeMode='contain'/>
      <CustomButton
        title={`Démarrer`}
        onPress={() => navigation.navigate(item.title)}
        disabled={lastUnlockedIndex < index}
      />
    </View>
  );
}

export default function CarouselChallenge ({ navigation }) {
  const lastUnlockedChallengeValue = useSelector(state => state.lastUnlockedChallenge);
  const startIndex = challenges.findIndex(challenge => challenge.title === lastUnlockedChallengeValue) || 0;
  const lastUnlockedIndex = challenges.findIndex(challenge => challenge.title === lastUnlockedChallengeValue);


  return (
    <Swiper loop={false} showsButtons={true} index={startIndex}>
      {challenges.map((item, index) => (
        <ChallengeItem 
          key={index}
          item={item} 
          index={index} 
          navigation={navigation} 
          lastUnlockedIndex={lastUnlockedIndex}
        />
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width/2,
    height: Dimensions.get('window').height/2,
  },
});