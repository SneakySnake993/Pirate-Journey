import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, disabled = false }) => {
  const noColor = "rgba(0, 0, 0, 0)";
  const disabledColor = "rgba(0, 0, 0, 0.6)";
  const gradientColors = disabled ? [disabledColor, disabledColor] : [noColor, noColor];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={styles.button}
    >
      <LinearGradient
        colors={gradientColors}
        style={StyleSheet.absoluteFill}
      />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    backgroundColor: "rgba(255, 183, 3, 0.9)",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    paddingHorizontal: 20,
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