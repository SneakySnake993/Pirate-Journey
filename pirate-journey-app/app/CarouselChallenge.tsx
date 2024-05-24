import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import lastUnlockedChallenge from '@/store/lastUnlockedChallenge';

import CarouselTemplate from '@/components/CarouselTemplate';

const challenges = [
  { title: 'Challenge1', image: require('@/assets/images/challenge-1.png') },
  { title: 'Challenge2', image: require('@/assets/images/challenge-2.png') },
  { title: 'Challenge3', image: require('@/assets/images/challenge-3-2.png') },
];

export default function CarouselChallenge ({ navigation }) {
  const lastUnlockedChallengeValue = useSelector(state => state.lastUnlockedChallenge);
  const lastUnlockedIndex = challenges.findIndex(challenge => challenge.title === lastUnlockedChallengeValue) || 0;

  return (
    <CarouselTemplate 
      challenges={challenges} 
      navigation={navigation} 
      lastUnlockedIndex={lastUnlockedIndex}
    />
  );
};