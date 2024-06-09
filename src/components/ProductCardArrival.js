import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProductCard = ({ product }) => {
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.bestChoice}>BEST CHOICE</Text>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
      </View>
      <Image source={product.image} style={styles.productImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight: 20,
    elevation: 5, // for Android
    shadowColor: '#000', // for iOS
    shadowOffset: { width: 0, height: 2 }, // for iOS
    shadowOpacity: 0.1, // for iOS
    shadowRadius: 5, // for iOS
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  bestChoice: {
    fontSize: 12,
    fontWeight: '400',
    color: '#007BFF',
    fontFamily: 'AirbnbCerealApp', // Tên phông chữ tùy chỉnh
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D163A',
    marginVertical: 5,
    fontFamily: 'AirbnbCerealApp', // Tên phông chữ tùy chỉnh
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'AirbnbCerealApp', // Tên phông chữ tùy chỉnh
  },
});

export default ProductCard;
