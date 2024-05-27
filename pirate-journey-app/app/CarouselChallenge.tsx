import React from 'react';
import getLastUnlockedChallengeIndex from '@/utils/getLastUnlockedChallenge';

// Components
import CarouselTemplate from '@/components/CarouselTemplate';
import getChallengesRoutes from '@/utils/getChallengesRoutes';
import getChallengesCarouselImages from '@/utils/getChallengesCarouselImages copy';

const challenges = getChallengesCarouselImages();

export default function CarouselChallenge ({ navigation }) {
  const lastUnlockedIndex = getLastUnlockedChallengeIndex(getChallengesRoutes());

  return (
    <CarouselTemplate 
      challenges={challenges} 
      navigation={navigation} 
      lastUnlockedIndex={lastUnlockedIndex}
    />
  );
};