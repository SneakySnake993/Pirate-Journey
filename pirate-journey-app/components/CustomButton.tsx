import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  onPressDisabled?: () => void;
  disabled?: boolean;
}

const borderRadiusButton = 15;

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, onPressDisabled, disabled = false }) => {
  const noColor = "rgba(0, 0, 0, 0)";
  const disabledColor = "rgba(0, 0, 0, 0.5)";
  const gradientColors = disabled ? [disabledColor, disabledColor] : [noColor, noColor];

  const handlePress = () => {
    if (disabled && onPressDisabled) {
      onPressDisabled();
    } else {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.button}
    >
      <LinearGradient
        colors={gradientColors}
        style={styles.disabledOverlay}
      />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadiusButton,
    backgroundColor: "rgba(255, 183, 3, 0.95)",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingHorizontal: 20,
  },
  disabledOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: borderRadiusButton,
  },
  text: {
    fontSize: 40,
    letterSpacing: 1.2,
    fontWeight: "600",
    color: "#000",
    textAlign: "center"
  }
});

export default CustomButton;