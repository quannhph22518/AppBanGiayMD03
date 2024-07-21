import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

const MyCart = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      image: require('../images/nike_2.jpg'),
      title: 'Nike Club Max',
      price: 64.95,
      size: 'L',
      quantity: 1,
      checked: false,
    },
    {
      id: 2,
      image: require('../images/nike_3.jpg'),
      title: 'Nike Air Max 200',
      price: 64.95,
      size: 'XL',
      quantity: 1,
      checked: false,
    },
    {
      id: 3,
      image: require('../images/nikee.jpg'),
      title: 'Nike Air Max',
      price: 64.95,
      size: 'XXL',
      quantity: 1,
      checked: false,
    },
  ]);

  const subtotal = items.reduce(
    (sum, item) => sum + (item.checked ? item.price * item.quantity : 0),
    0,
  );
  const shipping = 40.9;
  const total = subtotal + shipping;

  const incrementQuantity = id => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    );
  };

  const decrementQuantity = id => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity > 1
          ? {...item, quantity: item.quantity - 1}
          : item,
      ),
    );
  };

  const removeItem = id => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const toggleCheckBox = id => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? {...item, checked: !item.checked} : item,
      ),
    );
  };

  const renderItem = ({item}) => (
    <View style={styles.cartItem}>
      <CheckBox
        value={item.checked}
        onValueChange={() => toggleCheckBox(item.id)}
      />
      <Image source={item.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
      <Text style={styles.size}>{item.size}</Text>
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
        onPress={() => removeItem(item.id)}>
        <Text style={styles.removeButtonText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

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
          <Text>Subtotal</Text>
          <Text>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text>Shipping</Text>
          <Text>${shipping.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text>Total Cost</Text>
          <Text>${total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 20,
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
    color: '#888',
  },
  size: {
    marginLeft: 20,
    fontSize: 14,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
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
  removeButtonText: {
    color: 'red',
    fontSize: 20,
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
});

export default MyCart;