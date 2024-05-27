import React, {useState} from 'react';
import { View, ImageBackground, StyleSheet, Image } from 'react-native';
import CustomButton from '@/components/CustomButton';
import CustomModal from '@/components/CustomModal';
import { APP_STRINGS } from '@/constants/ApplicationStrings';

export default function CarouselItem({ item, index, navigation, lastUnlockedIndex }) {

  const [modalVisible, setModalVisible] = useState(false);

  const handleOnPressDisabled = () => {
    setModalVisible(true);
  };

  const lockerImage = require('@/assets/images/locker.png');

  return (
    <View key={index} style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground source={item.image} style={styles.image} resizeMode='cover'>
          {lastUnlockedIndex < index && (
            <Image source={lockerImage} style={styles.lockerImage} resizeMode='contain'/>
          )}
          <View style={styles.buttonContainer}>
            <CustomButton
              title={APP_STRINGS.CAROUSEL_START_BUTTON_TEXT}
              onPress={() => navigation.navigate(item.title)}
              onPressDisabled={handleOnPressDisabled}
              disabled={lastUnlockedIndex < index}
            />
          </View>
          <CustomModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            title={APP_STRINGS.LOCKED_CHALLENGE_TITLE}
            text={APP_STRINGS.LOCKED_CHALLENGE_TEXT}
          />
        </ImageBackground>
      </View>
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
  imageContainer: {
    alignSelf: 'stretch',
    flex: 1,
    maxWidth: '100%',
    maxHeight: '100%',
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 5,
  },
  image: {
    alignSelf: 'stretch',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockerImage: {
    alignSelf: 'center',
    width: '50%',
    height: '50%',
    opacity: 0.8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  }
});