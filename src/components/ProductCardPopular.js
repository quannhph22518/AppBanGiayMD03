import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const formatPriceVND = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VND';
};

const ProductCardPopular = ({ product }) => {
  return (
    <View style={styles.card}>
      <Image source={product.image} style={styles.productImage} />
      <Text style={styles.bestSeller}>BEST SELLER</Text>
      <Text style={styles.productName} numberOfLines={1}>{product.title}</Text>
      <Text style={styles.productPrice}>{formatPriceVND(product.price)}</Text>
      {/* <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={20} color="white" />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    fontFamily: 'Airbnb Cereal App',
    width: 162,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    marginRight: 25,
    elevation: 5, // for Android
    shadowColor: '#000', // for iOS
    shadowOffset: { width: 0, height: 2 }, // for iOS
    shadowOpacity: 0.1, // for iOS
    shadowRadius: 5, // for iOS
    marginBottom: 20,
  },
  productImage: {
    alignSelf: 'center',
    width: '80%',
    height: 100,
    resizeMode: 'contain',
  },
  bestSeller: {
    fontSize: 12,
    fontWeight: '400',
    color: '#007BFF',
    marginTop: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0D163A',
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginBottom: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007BFF',
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    padding: 10,
  },
});

export default ProductCardPopular;
