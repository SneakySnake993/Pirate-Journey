import React from 'react';
import { View, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import CustomButton from '@/components/CustomButton';

export default function CarouselItem({ item, index, navigation, lastUnlockedIndex }) {
    return (
      <View key={index} style={styles.container}>
        <ImageBackground source={item.image} style={styles.image} resizeMode='cover'>
          <View style={styles.buttonContainer}>
            <CustomButton
              title={`Démarrer`}
              onPress={() => navigation.navigate(item.title)}
              disabled={lastUnlockedIndex < index}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#023047',
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 60,
  },
  image: {
    alignSelf: 'stretch',
    flex: 1,
    maxWidth: '100%',
    maxHeight: '100%',
    width: '100%',
    borderRadius: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  }
});