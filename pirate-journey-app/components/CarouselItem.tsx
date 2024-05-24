import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import CustomButton from '@/components/CustomButton';

export default function CarouselItem({ item, index, navigation, lastUnlockedIndex }) {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#023047',
  },
  image: {
    width: Dimensions.get('window').width/2,
    height: Dimensions.get('window').height/2,
  },
});