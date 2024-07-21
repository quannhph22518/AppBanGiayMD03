import React, { useState, useEffect, useCallback, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Button, ToastAndroid } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { AppContext } from '../ultils/AppContext';

const Favourite = ({ navigation }) => {
  const { isCheckLogin, token } = useContext(AppContext);
  const [wishlist, setWishlist] = useState([]);
  const [filteredWishlist, setFilteredWishlist] = useState([]);

  useFocusEffect(
    useCallback(() => {
      if (isCheckLogin) {
        fetchWishlist();
      }
    }, [isCheckLogin])
  );

  const fetchWishlist = async () => {
    try {
      const response = await fetch('http://192.168.26.7:5000/api/user/wishlist', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setWishlist(data.wishlist);
      
      // Tạo mảng mới chỉ chứa các trường cần thiết
      const filteredData = data.wishlist.map(item => ({
        id: item._id,
        title: item.title,
        price: item.price,
        image: item.images[0].url, // Assuming 'url' is the correct path to the image
      }));
      setFilteredWishlist(filteredData);

      
    } catch (error) {
      console.error('Error:', error);
      ToastAndroid.show('Lỗi khi tải dữ liệu sản phẩm', ToastAndroid.SHORT);
    }
  };

  const handleProductPress = (id) => {
    navigation.navigate('ProductDetail', { id });
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity onPress={() => handleProductPress(item.id)} style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.bestSeller}>BEST SELLER</Text>
      <Text style={styles.productName} numberOfLines={2}>{item.title}</Text>
      <View style={styles.priceColorContainer}>
        <Text style={styles.productPrice}>{item.price.toLocaleString()} VND</Text>
      </View>
      <TouchableOpacity style={styles.heartIconContainer} onPress={() => toggleFavourite(item.id)}>
        <Ionicons name="heart" size={24} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Favourite</Text>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="heart" size={24} color="red" />
        </TouchableOpacity>
      </View>

      {!isCheckLogin ? (
        <View style={styles.loginContainer}>
          <Text style={styles.loginPrompt}>Bạn cần đăng nhập để sử dụng chức năng này.</Text>
          <Button title="Đăng nhập" onPress={() => navigation.navigate('User')} />
        </View>
      ) : filteredWishlist.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Danh sách yêu thích đang trống</Text>
        </View>
      ) : (
        <FlatList
          data={filteredWishlist}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.productList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F8F9FA',
    marginBottom: 30,
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
    marginLeft: 120,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginPrompt: {
    fontSize: 18,
    marginBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#555',
  },
  productList: {
    paddingHorizontal: 16,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: '1%',
    elevation: 5,
    marginRight: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
  },
  bestSeller: {
    fontSize: 12,
    fontWeight: '400',
    color: '#007BFF',
    marginTop: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D163A',
    marginVertical: 5,
  },
  priceColorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  heartIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default Favourite;
