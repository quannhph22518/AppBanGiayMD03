import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, ActivityIndicator, ToastAndroid, Modal, Pressable, FlatList } from 'react-native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating-widget';
import { AppContext } from '../ultils/AppContext';
import QuantitySelector from '../components/QuantitySelector';

const ProductDetail = ({ navigation, route }) => {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);
  const { isCheckLogin, token, userId } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [action, setAction] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://192.168.0.149:3000/api/product/${id}`);
        setProduct(response.data);
        setLoading(false);

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

  const formatPrice = price => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleFavourite = async () => {
    if (!isCheckLogin) {
      navigation.navigate('User');
    } else {
      try {
        const response = await axios.put('http://192.168.0.149:3000/api/product/wishlist', {
          _id: userId,
          prodId: product._id,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsFavourite(!isFavourite);
        ToastAndroid.show(isFavourite ? 'Removed from wishlist' : 'Added to wishlist', ToastAndroid.SHORT);
      } catch (error) {
        console.error('Error updating wishlist:', error);
        ToastAndroid.show('Failed to update wishlist', ToastAndroid.SHORT);
      }
    }
  };

  const handleAddToCart = async () => {
    const cartItem = {
      _id: product._id,
      count: quantity,
      color: selectedColor,
    };
  
    console.log("Payload:", JSON.stringify({ cart: [cartItem] }));
  
    try {
      const response = await axios.post(
        'http://192.168.0.149:3000/api/user/cart',
        { cart: [cartItem] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      ToastAndroid.show('Added to cart successfully', ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error adding to cart:', error);
      ToastAndroid.show('Failed to add to cart', ToastAndroid.SHORT);
    } finally {
      resetSelections();
      setModalVisible(false);
    }
  };
  
  



  const renderPagination = (index, total) => {
    return (
      <View style={styles.paginationStyle}>
        <Text style={styles.paginationText}>
          {index + 1}/{total}
        </Text>
      </View>
    );
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

  const getImageForColor = (color) => {
    const image = product.images.find(img => img.public_id === color);
    return image ? image.url : product.images[0].url;
  };

  const resetSelections = () => {
    setSelectedColor(null);
    setSelectedSize(null);
    setQuantity(1);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.iconContainer} onPress={() => { navigation.goBack(); }}>
            <Ionicons name="chevron-back-outline" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Product Details</Text>
          <TouchableOpacity onPress={handleFavourite} style={styles.iconContainer}>
            <Ionicons name={isFavourite ? 'heart' : 'heart-outline'} size={24} color={isFavourite ? 'red' : 'black'} />
          </TouchableOpacity>
        </View>

        <View style={styles.productImageContainer}>
          <Swiper showsButtons={false} loop={false} style={styles.swiper} renderPagination={renderPagination}>
            {product.images.map((image, index) => (
              <View key={index} style={styles.slide}>
                <Image source={{ uri: image.url }} style={styles.productImage} />
              </View>
            ))}
          </Swiper>
        </View>

        <View style={styles.productInfoContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
            <Text style={styles.bestSeller}>{product.tags.toUpperCase()}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
              <Text style={{ color: '#000', fontWeight: '600' }}>Đã bán: </Text>
              <Text style={{ color: '#000', fontWeight: '600' }}>{product.sold}</Text>
            </View>
          </View>

          <Text style={styles.productName}>{product.title}</Text>
          <Text style={styles.productPrice}>{formatPrice(product.price)} VND</Text>
          <Text style={styles.productDescription}>{product.description}</Text>

          <View>
            <Text style={styles.sectionTitle}>Đánh giá sản phẩm</Text>
            <View style={styles.ratingContainer}>
              <StarRating rating={parseFloat(product.totalrating)} onChange={() => {}} starSize={17} readOnly={true} containerStyle={styles.starRating} />
              <Text style={styles.totalRatingText}>{product.totalrating}/5</Text>
            </View>

            {product.ratings.map((rating, index) => (
              <View key={index} style={styles.reviewContainer}>
                <StarRating rating={rating.star} onChange={() => {}} starSize={20} readOnly={true} containerStyle={styles.starRating} />
                <Text style={styles.reviewComment}>{rating.comment}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.priceAddToCartContainer}>
        <Pressable style={styles.chatButton}>
          <Ionicons name="chatbubble-outline" size={24} color="#fff" />
        </Pressable>
        <View style={styles.verticalDivider} />
        <Pressable style={styles.addToCartButton} onPress={() => { setAction('add'); setModalVisible(true); }}>
          <Ionicons name="cart-outline" size={24} color="#fff" />
        </Pressable>
        <View style={styles.verticalDivider} />
        <TouchableOpacity style={styles.buyNowButton} onPress={() => { setAction('buy'); setModalVisible(true); }}>
          <Text style={styles.buyNowText}>Mua ngay</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { setModalVisible(!modalVisible); }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ borderWidth: 0.5, borderColor: '#E0E0E0', padding: 5, borderRadius: 10 }}>
                <Image source={{ uri: getImageForColor(selectedColor) }} style={styles.modalImage} />
              </View>

              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                <TouchableOpacity style={styles.closeButton} onPress={() => { 
                  setModalVisible(!modalVisible); 
                  resetSelections();
                }}>
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>

                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.modalPrice}>{formatPrice(product.price)} VND</Text>
                  <Text style={styles.modalStock}>Kho: {product.quantity}</Text>
                </View>
              </View>
            </View>

            <Text style={[styles.modalText, { marginTop: 20 }]}>Màu sắc</Text>
            <FlatList data={product.color} horizontal renderItem={({ item }) => (
              <Pressable style={[styles.colorOption, { backgroundColor: item === selectedColor ? '#2196F3' : 'white' }]} onPress={() => setSelectedColor(item)}>
                <Text style={{ color: item === selectedColor ? 'white' : 'black' }}>{item}</Text>
              </Pressable>
            )} keyExtractor={item => item} />

            <Text style={[styles.modalText, { marginTop: 20 }]}>Size</Text>
            <FlatList data={product.size} horizontal renderItem={({ item }) => (
              <Pressable 
                style={[styles.sizeOption, { backgroundColor: item === selectedSize ? '#2196F3' : 'white', borderColor: selectedColor ? '#ccc' : '#E0E0E0' }]} 
                onPress={() => selectedColor && setSelectedSize(item)}
                disabled={!selectedColor}
              >
                <Text style={{ color: item === selectedSize ? 'white' : 'black' }}>{item}</Text>
              </Pressable>
            )} keyExtractor={item => item} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', marginTop: 20 }}>
              <Text style={[styles.modalText]}>Số lượng</Text>
              <QuantitySelector quantity={quantity} setQuantity={setQuantity} enabled={selectedColor && selectedSize} />
            </View>

            <Pressable
              style={[styles.button, 
                { 
                  backgroundColor: selectedColor && selectedSize ? '#2196F3' : 'white', 
                  borderColor: selectedColor && selectedSize ? '#2196F3' : '#E0E0E0', 
                  borderWidth: 1, 
                  marginTop: 20 
                }
              ]}
              onPress={() => { 
                if (action === 'add') {
                  handleAddToCart();
                } else if (action === 'buy') {
                  // Handle buy now logic here
                  // You might want to add similar logic as handleAddToCart but with immediate checkout
                }
              }}
              disabled={!selectedColor || !selectedSize}
            >
              <Text style={{ color: selectedColor && selectedSize ? 'white' : 'black', fontWeight: 'bold', textAlign: 'center' }}>
                {action === 'buy' ? 'Mua ngay' : 'Thêm vào giỏ hàng'}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    flexGrow: 1,
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
    color: 'red',
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  totalRatingText: {
    marginLeft: 8,
    color: 'red',
  },
  starRating: {
    marginHorizontal: 1,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#007BFF',
  },
  chatButton: {
    backgroundColor: '#00C853',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  addToCartButton: {
    backgroundColor: '#00C853',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  buyNowButton: {
    backgroundColor: '#007BFF',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  buyNowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  verticalDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
    height: '100%',
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
  paginationStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  paginationText: {
    color: '#fff',
    fontSize: 16,
  },
  centeredView: {
    justifyContent: 'flex-end',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  modalImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  modalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
  },
  modalStock: {
    fontSize: 16,
    color: '#333',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D163A',
    marginBottom: 10,
  },
  colorOption: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  sizeOption: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProductDetail;
