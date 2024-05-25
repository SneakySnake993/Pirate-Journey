import React, {useState} from 'react';
import { View, ImageBackground, StyleSheet, Image } from 'react-native';
import CustomButton from '@/components/CustomButton';
import CustomModal from '@/components/CustomModal';

export default function CarouselItem({ item, index, navigation, lastUnlockedIndex }) {

  const [modalVisible, setModalVisible] = useState(false);

  const handleOnPressDisabled = () => {
    setModalVisible(true);
  };

  const buttonTitle = "Démarrer";
  const modalTitle = "Niveau bloqué";
  const modalText = "Vous devez terminer les niveaux précédents pour débloquer celui-ci";
  const lockerImage = require('@/assets/images/locker.png');

  return (
    <View key={index} style={styles.container}>
      <ImageBackground source={item.image} style={styles.image} resizeMode='cover'>
        {lastUnlockedIndex < index && (
          <Image source={lockerImage} style={styles.lockerImage} resizeMode='contain'/>
        )}
        <View style={styles.buttonContainer}>
          <CustomButton
            title={buttonTitle}
            onPress={() => navigation.navigate(item.title)}
            onPressDisabled={handleOnPressDisabled}
            disabled={lastUnlockedIndex < index}
          />
        </View>
        <CustomModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          title={modalTitle}
          text={modalText}
        />
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
    justifyContent: 'center',
    alignItems: 'center',
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