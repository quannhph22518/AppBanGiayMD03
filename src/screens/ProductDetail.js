import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProductDetail = ({ navigation }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  const sizes = [38, 39, 40, 41, 42, 43];

  const images = [
    require('../images/anike.png'),
    require('../images/bnike.png'),
    require('../images/cnike.png'),
    require('../images/dnike.png'),
    
  ];

  const handleSizePress = (size) => {
    setSelectedSize(size);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator = {false}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity  style={styles.iconContainer}>
            <Ionicons name="chevron-back-outline" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Men's Shoes</Text>
          <TouchableOpacity onPress={() => console.log('Cart pressed')} style={styles.iconContainer}>
            <Ionicons name="cart-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Product Image */}
        <View style={styles.productImageContainer}>
          <Image source={require('../images/shoeblu1.png')} style={styles.productImage} />
          <Image source={require('../images/arrow.png')} style={{ position: 'absolute', bottom: -25 }} />
        </View>

        {/* Product Info */}
        <View style={styles.productInfoContainer}>
          <Text style={styles.bestSeller}>BEST SELLER</Text>
          <Text style={styles.productName}>Nike Air Jordan</Text>
          <Text style={styles.productPrice}>$967.800</Text>
          <Text style={styles.productDescription}>
            Air Jordan is an American brand of basketball shoes athletic, casual, and style clothing produced by Nike...
          </Text>
          <Text style={styles.sectionTitle}>Gallery</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryContainer}>
            <Image source={require('../images/shoeblue.png')} style={styles.galleryImage} />
            <Image source={require('../images/shoered.png')} style={styles.galleryImage} />
            <Image source={require('../images/shoeblue.png')} style={styles.galleryImage} />
          </ScrollView>

          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.sizeContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeButton,
                    selectedSize === size && styles.selectedSizeButton,
                  ]}
                  onPress={() => handleSizePress(size)}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      selectedSize === size && styles.selectedSizeText,
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      {/* Price and Add to Cart Button */}
      <View style={styles.priceAddToCartContainer}>
        <Text style={styles.priceText}>$849.69</Text>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    paddingBottom: 70, // Để tránh bị che bởi nút Add To Cart
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F8F9FA',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    color: '#0D163A',
  },
  productImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  productImage: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
  productInfoContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    elevation: 5, // for Android
  },
  bestSeller: {
    fontSize: 12,
    fontWeight: '400',
    color: '#007BFF',
    marginBottom: 10,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0D163A',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D163A',
    marginBottom: 10,
  },
  galleryContainer: {
    marginBottom: 20,
  },
  galleryImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 10,
  },
  sizeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  sizeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    marginRight: 10,
  },
  selectedSizeButton: {
    backgroundColor: '#007BFF',
  },
  sizeText: {
    fontSize: 14,
    color: '#333',
  },
  selectedSizeText: {
    color: '#fff',
  },
  priceAddToCartContainer: {
    elevation: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 15,
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  addToCartButton: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
    paddingVertical: 13,
    paddingHorizontal: 20,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetail;
