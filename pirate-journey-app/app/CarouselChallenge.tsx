import React, { useState } from 'react';
import { View, Image, Button, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const challenges = [
  { title: 'Challenge 1', image: require('../assets/images/react-logo.png') },
  { title: 'Challenge 2', image: require('../assets/images/react-logo.png') },
  { title: 'Challenge 3', image: require('../assets/images/react-logo.png') },
];

export default function CarouselChallenge ({ navigation }) {
  const [currentChallenge, setCurrentChallenge] = useState(challenges[0]);

  return (
    <Swiper loop={false} showsButtons={true} onIndexChanged={(index) => setCurrentChallenge(challenges[index])}>
      {challenges.map((item, index) => (
        <View key={index} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={item.image} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}/>
          <Button
            title={`Start ${item.title}`}
            onPress={() => navigation.navigate(item.title)}
          />
        </View>
      ))}
    </Swiper>
  );
};