import React from 'react';
import { Image, TouchableOpacity, Alert } from 'react-native';

const HelpButton = ({style, onPressImage}) => {

  const helpImage = require('@/assets/images/info-circle.png');
  return (
    <TouchableOpacity onPress={onPressImage} style={style}>
        <Image
            source={helpImage}
            style={{ width: 50, height: 50 }}
        />
    </TouchableOpacity>
  );
};

export default HelpButton;