import React, { useState } from 'react';

// Redux Store
import { useSelector } from 'react-redux';
import lastUnlockedChallenge from '@/store/lastUnlockedChallenge';

// Components
import CarouselTemplate from '@/components/CarouselTemplate';

const challenges = [
  { title: 'Challenge1', image: require('@/assets/images/challenge1-carousel.png') },
  { title: 'Challenge2', image: require('@/assets/images/challenge2-carousel.png') },
  { title: 'Challenge3', image: require('@/assets/images/challenge3-carousel.png') },
];

export default function CarouselChallenge ({ navigation }) {
  const lastUnlockedChallengeValue = useSelector(state => state.lastUnlockedChallenge.value);
  const lastUnlockedIndex = challenges.findIndex(challenge => challenge.title === lastUnlockedChallengeValue) || 0;
  console.log(lastUnlockedChallengeValue)
  console.log(lastUnlockedIndex)

  return (
    <CarouselTemplate 
      challenges={challenges} 
      navigation={navigation} 
      lastUnlockedIndex={lastUnlockedIndex}
    />
  );
};