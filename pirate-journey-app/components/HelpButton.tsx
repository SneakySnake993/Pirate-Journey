import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { Svg } from 'react-native-svg';

const HelpButton = (text) => {
  const onImagePress = () => {
    Alert.alert('Information', text);
  };

  return (
    <TouchableOpacity onPress={onImagePress}>
        {/* <Svg
            width="62" 
            height="62"
            source='@/assets/images/info-circle.svg'
        /> */}
    </TouchableOpacity>
  );
};

export default HelpButton;