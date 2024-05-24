import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, Dimensions} from 'react-native';
import { useSelector } from 'react-redux';
import Swiper from 'react-native-swiper';
import lastUnlockedChallenge from '@/store/lastUnlockedChallenge';

import CustomButton from '@/components/CustomButton';
import {SwiperArrowNext, SwiperArrowPrev} from '@/components/SwiperArrow';
import { act } from 'react-test-renderer';

const challenges = [
  { title: 'Challenge1', image: require('@/assets/images/challenge-1-image.png') },
  { title: 'Challenge2', image: require('@/assets/images/react-logo.png') },
  { title: 'Challenge3', image: require('@/assets/images/react-logo.png') },
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
    <Swiper 
      loop={false} 
      showsButtons={true} 
      index={startIndex}
      nextButton={<SwiperArrowNext/>}
      prevButton={<SwiperArrowPrev/>}
      dot={<View style={styles.dotStyle}/>}
      activeDot={<View style={styles.activeDotStyle}/>}
    >
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
    backgroundColor: '#023047',
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
  dotStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 15,
    height: 15,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  activeDotStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 15,
    height: 15,
    borderRadius: 20,
    marginHorizontal: 8,
  },
});