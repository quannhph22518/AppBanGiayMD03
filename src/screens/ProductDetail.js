import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StarRating from 'react-native-star-rating-widget';
import { AppContext } from '../ultils/AppContext';

const ProductDetail = ({ navigation, route }) => {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formattedPrice, setFormattedPrice] = useState("0 VND");
  const [isFavourite, setIsFavourite] = useState(false);
  const { isCheckLogin, token, userId } = useContext(AppContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://192.168.0.149:5000/api/product/${id}`);
        setProduct(response.data);
        setLoading(false);

        // Kiểm tra xem sản phẩm đã được yêu thích hay chưa
        if (response.data.isFavourite) {
          setIsFavourite(true);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSizePress = (size) => {
    setSelectedSize(size);
    setFormattedPrice(formatPrice(product.price) + " VND");
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleFavourite = async () => {
    if (!isCheckLogin) {
      navigation.navigate('User');
    } else {
      try {
        const response = await axios.put(
          'http://192.168.0.149:5000/api/product/wishlist',
          {
            _id: userId,
            prodId: product._id
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        setIsFavourite(!isFavourite);
        ToastAndroid.show(
          isFavourite ? 'Removed from wishlist' : 'Added to wishlist',
          ToastAndroid.SHORT
        );
      } catch (error) {
        console.error('Error updating wishlist:', error);
        ToastAndroid.show('Failed to update wishlist', ToastAndroid.SHORT);
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text>Unable to fetch product details</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.iconContainer} onPress={() => { navigation.goBack() }}>
            <Ionicons name="chevron-back-outline" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Product Details</Text>
          <TouchableOpacity onPress={handleFavourite} style={styles.iconContainer}>
            <Ionicons name={isFavourite ? "heart" : "heart-outline"} size={24} color={isFavourite ? "red" : "black"} />
          </TouchableOpacity>
        </View>

        <View style={styles.productImageContainer}>
          <Swiper
            showsButtons={false}
            autoplay={true}
            loop={true}
            autoplayTimeout={2.5}
            style={styles.swiper}
          >
            {product.images.map((image, index) => (
              <View key={index} style={styles.slide}>
                <Image source={{ uri: image.url }} style={styles.productImage} />
              </View>
            ))}
          </Swiper>
        </View>

        <View style={styles.productInfoContainer}>
          <Text style={styles.bestSeller}>{product.tags.toUpperCase()}</Text>
          <Text style={styles.productName}>{product.title}</Text>
          <Text style={styles.productPrice}>{formatPrice(product.price)} VND</Text>
          <Text style={styles.productDescription}>{product.description}</Text>

          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.sizeContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {product.size.map((size) => (
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

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            <StarRating
              rating={parseFloat(product.totalrating)}
              onChange={() => { }}
              starSize={15}
              style={styles.starRating}
              readOnly={true}
            />
          </View>

          {product.ratings.map((rating, index) => (
            <View key={index} style={styles.reviewContainer}>
              <StarRating
                rating={rating.star}
                onChange={() => { }}
                starSize={20}
                style={styles.starRating}
                readOnly={true}
              />
              <Text style={styles.reviewComment}>{rating.comment}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.priceAddToCartContainer}>
        <Text style={styles.priceText}>{formattedPrice}</Text>
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
    paddingBottom: 70,
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
  swiper: {
    height: 250,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  productInfoContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    elevation: 5,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D163A',
    marginBottom: 10,
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
  starRating: {
    marginBottom: 10,
  },
  reviewContainer: {
    marginBottom: 10,
    marginTop: 10,
  },
  reviewComment: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductDetail;
