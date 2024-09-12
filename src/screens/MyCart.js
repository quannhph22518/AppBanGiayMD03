import React, { useState, useContext, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Button,
  ToastAndroid,
  Alert
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { AppContext } from '../ultils/AppContext';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MyCart = ({ navigation }) => {
  const { isCheckLogin, token } = useContext(AppContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (isCheckLogin) {
        fetchCart();
      }
    }, [isCheckLogin])
  );

  const fetchCart = async () => {
    try {
      const response = await fetch('http://192.168.10.106:3000/api/user/cart', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data === null || !data.products) {
        setItems([]);
      } else {
        const cartItems = data.products.map(item => ({
          id: item.product._id,
          image: { uri: item.product.images[0].url },
          title: item.product.title,
          price: item.price,
          color: item.color,
          quantity: item.count,
          checked: false,
        }));
        setItems(cartItems);
      }
    } catch (error) {
      console.error('Error:', error);
      ToastAndroid.show('Lỗi khi tải dữ liệu giỏ hàng', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  const subtotal = items.reduce(
    (sum, item) => sum + (item.checked ? item.price * item.quantity : 0),
    0,
  );
  const shipping = items.some(item => item.checked) ? 40900 : 0;
  const total = subtotal + shipping;

  const incrementQuantity = id => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrementQuantity = id => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } : item,
      ),
    );
  };

  const confirmRemoveItem = id => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn xóa sản phẩm này?",
      [
        {
          text: "Không",
          style: "cancel"
        },
        {
          text: "Có",
          onPress: () => removeItem(id)
        }
      ],
      { cancelable: false }
    );
  };

  const removeItem = id => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const toggleCheckBox = id => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const handleCheckout = () => {
    const checkoutData = items.filter(item => item.checked).map(item => ({
      productId: item.id,
      image: item.image,
      name: item.title,
      price: item.price,
      color: item.color,
      count: item.quantity,
    }));
  
    if (checkoutData.length > 0) {
      navigation.navigate('Checkout1', { checkoutData });
      // console.log('Navigating to Checkout with data:', checkoutData);
    } else {
      ToastAndroid.show('Vui lòng chọn ít nhất một sản phẩm để thanh toán', ToastAndroid.SHORT);
    }
  };
  

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <CheckBox
        value={item.checked}
        onValueChange={() => toggleCheckBox(item.id)}
      />
      <Image source={item.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>{formatCurrency(item.price)}</Text>
      </View>
      <View style={styles.quantityControls}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => decrementQuantity(item.id)}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => incrementQuantity(item.id)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => confirmRemoveItem(item.id)}>
        <Icon name="trash" size={20} color="blue" />
      </TouchableOpacity>
    </View>
  );

  if (!isCheckLogin) {
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.loginPrompt}>Bạn cần đăng nhập để sử dụng chức năng này.</Text>
        <Button title="Đăng nhập" onPress={() => navigation.navigate('User')} />
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>My Cart</Text>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>My Cart</Text>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Giỏ hàng đang trống</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text>Tạm tính</Text>
          <Text>{formatCurrency(subtotal)}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text>Phí vận chuyển</Text>
          <Text>{formatCurrency(shipping)}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text>Tổng cộng</Text>
          <Text>{formatCurrency(total)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 20,
    resizeMode: 'contain'
  },
  info: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#ff4500',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  removeButton: {
    marginLeft: 20,
  },
  summary: {
    marginTop: 20,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  emptyText: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default MyCart;
