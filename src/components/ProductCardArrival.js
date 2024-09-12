import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProductCardArrival = ({ product, onPress,isValidUrl=false }) => {
  const formatPriceVND = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VND';
  };

  return (
    <TouchableOpacity style={isValidUrl?[styles.card,{marginLeft:5,marginRight:5}]:styles.card} onPress={onPress}>
      <View style={styles.textContainer}>
        <Text style={styles.bestChoice}>BEST CHOICE</Text>
        <Text style={styles.productName} numberOfLines={1}>{product.title}</Text>
        <Text style={styles.productPrice}>{formatPriceVND(product.price)}</Text>
      </View>
      <Image source={isValidUrl?{uri:product.image}:product.image} style={styles.productImage} />

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight:20,
    marginVertical:5,
    elevation: 5, // for Android
    shadowColor: '#000', // for iOS
    shadowOffset: { width: 0, height: 2 }, // for iOS
    shadowOpacity: 0.1, // for iOS
    shadowRadius: 5, // for iOS
    flexDirection: 'row',
    gap:40,
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

export default ProductCardArrival;
