import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Favourite = ({ navigation }) => {
  const products = [
    {
      id: '1',
      name: 'Nike Jordan',
      price: 58.7,
      image: require('../images/shoered.png'),
      colors: ['#FFCDD2', '#C5E1A5', '#B3E5FC'],
    },
    {
      id: '2',
      name: 'Nike Air Max',
      price: 37.8,
      image: require('../images/shoeblue.png'),
      colors: ['#C5CAE9', '#CFD8DC'],
    },
    {
      id: '3',
      name: 'Nike Club Max',
      price: 47.7,
      image: require('../images/shoeblue.png'),
      colors: ['#BBDEFB', '#FFE0B2', '#C8E6C9'],
    },
    {
      id: '4',
      name: 'Nike Air Max',
      price: 57.6,
      image: require('../images/shoeblue.png'),
      colors: ['#B2DFDB', '#D1C4E9', '#BBDEFB'],
    },
  ];

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.bestSeller}>BEST SELLER</Text>
      <Text style={styles.productName}>{item.name}</Text>
      <View style={styles.priceColorContainer}>
        <Text style={styles.productPrice}>${item.price}</Text>
        <View style={styles.colorContainer}>
          {item.colors.map((color, index) => (
            <View key={index} style={[styles.colorCircle, { backgroundColor: color }]} />
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.heartIconContainer}>
        <Ionicons name="heart-outline" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity  style={styles.iconContainer}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Favourite</Text>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="heart-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />
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
  colorContainer: {
    flexDirection: 'row',
  },
  colorCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  heartIconContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});

export default Favourite;
