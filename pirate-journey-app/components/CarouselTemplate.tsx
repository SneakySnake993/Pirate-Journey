import React from 'react';
import Swiper from 'react-native-swiper';

import { SwiperArrowNext, SwiperArrowPrev } from '@/components/SwiperArrow';
import { Dot, ActiveDot } from '@/components/CarouselDots';
import CarouselItem from '@/components/CarouselItem';

export default function CarouselTemplate({ challenges, navigation, lastUnlockedIndex }) {
  return (
    <Swiper 
      loop={false} 
      showsButtons={true} 
      index={lastUnlockedIndex}
      nextButton={<SwiperArrowNext/>}
      prevButton={<SwiperArrowPrev/>}
      dot={<Dot/>}
      activeDot={<ActiveDot/>}
    >
      {challenges.map((item, index) => (
        <CarouselItem 
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