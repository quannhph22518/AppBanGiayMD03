import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
const ItemOrder = ({order}) => {
  return (
    <View style={styles.container}>
      {order.products.map((item, index) => (
        <View key={item._id} style={styles.productContainer}>
          <Text style={styles.productTitle}>Product: {item.product.title}</Text>
          <Text>Price: {item.product.price.toLocaleString()} VND</Text>
          <Text>Count: {item.count}</Text>
          <Text>Color: {item.color}</Text>
        </View>
      ))}
      <Text
        style={{
          marginTop: 10,
        }}>
        Payment Method: {order.paymentMethod}
      </Text>
      <Text>Phone: {order.phone}</Text>
      <Text>Address: {order.address}</Text>
      <Text>
        Total Amount:{' '}
        <Text style={{color: 'black', fontWeight: 700,}}>
          {order.totalAmount.toLocaleString()} VND
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productContainer: {},
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ItemOrder;
