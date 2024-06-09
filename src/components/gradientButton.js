import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function GradientButton({ image, value, onPress, containerStyle, buttonStyle }) {
  return (
    <LinearGradient
      colors={['rgba(9, 181, 211, 0.9)', 'rgba(58, 131, 244,0.9)']}
      end={{ x: 1, y: 1 }}
      start={{ x: 0.1, y: 0.2 }}
      style={[styles.container, containerStyle]}
    >
      <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
        <Image source={image} style={styles.image} />
        <Text style={styles.text}>{value}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 16,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
