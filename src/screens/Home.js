import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GradientButton from '../components/gradientButton';
import SearchBar from '../components/SearchBar';
import ProductCardPopular from '../components/ProductCardPopular';
import ProductCardArrival from '../components/ProductCardArrival';

const categories = [
  {
    name: 'Nike',
    image: require('../images/nike.png'),
  },
  {
    name: 'Puma',
    image: require('../images/puma.png'),
  },
  {
    name: 'Adidas',
    image: require('../images/adidas.png'),
  },
  {
    name: 'Converse',
    image: require('../images/conserve.png'),
  },
];



const products = [
  {
    name: 'Nike Jordan',
    image: require('../images/shoered.png'), // Đảm bảo đường dẫn đúng
    price: 493.0,
  },
  {
    name: 'Nike Air Max',
    image: require('../images/shoeblue.png'), // Đảm bảo đường dẫn đúng
    price: 897.99,
  },
];

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('Nike');

  const handleSeeAll = () => {
    // Logic cho nút See All, có thể là điều hướng đến màn hình khác
    console.log('See all pressed');
  };

  return (
    <ScrollView>
<View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name="grid-outline" size={24} color="black" />
        </View>
        <View style={styles.locationContainer}>
          <Text style={styles.storeLocationText}>Store location</Text>
          <View style={styles.location}>
            <Ionicons name="location-sharp" size={16} color="red" />
            <Text style={styles.locationText}>Mondolibug, Sylhet</Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <Ionicons name="cart-outline" size={24} color="black" />
          <View style={styles.notificationDot} />
        </View>
      </View>

      {/* search */}
      <SearchBar />

      {/* categories */}
      <View style={styles.categoryContainer}>
        <View style={styles.scrollContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map(cat => {
              if (cat.name === activeCategory) {
                return (
                  <GradientButton
                    key={cat.name}
                    containerStyle={styles.buttonContainer}
                    value={cat.name}
                    image={cat.image}
                    onPress={() => setActiveCategory(cat.name)}>
                    <Image source={cat.image} style={styles.image} />
                    <Text style={styles.text}>{cat.name}</Text>
                  </GradientButton>
                );
              } else {
                return (
                  <TouchableOpacity
                    onPress={() => setActiveCategory(cat.name)}
                    key={cat.name}
                    style={styles.normalButton}>
                    <Image source={cat.image} style={styles.image} />
                  </TouchableOpacity>
                );
              }
            })}
          </ScrollView>
        </View>
      </View>

      
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Popular Shoes</Text>
        <TouchableOpacity onPress={handleSeeAll}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      {/* Product Cards Popular*/}
      <View style={{marginLeft: 10, marginTop: 10}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {products.map((product, index) => (
            <ProductCardPopular key={index} product={product} />
          ))}
        </ScrollView>
      </View>

   
      <View style={styles.headerContainer}>
        <Text style={styles.title}>New Arrivals</Text>
        <TouchableOpacity onPress={handleSeeAll}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      {/* Product Cards Arrival*/}
      <View style={{marginLeft: 10, marginTop: 10}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {products.map((product, index) => (
            <ProductCardArrival key={index} product={product} />
          ))}
        </ScrollView>
      </View>
    </View>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#F8F9FA',
    marginHorizontal: 10,
    marginBottom: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#F8F9FA',
    marginBottom: 30,
    marginTop: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  locationContainer: {
    alignItems: 'center',
  },
  storeLocationText: {
    fontSize: 12,
    color: '#888',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 16,
    color: '#333',
  },
  notificationDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
  },
  categoryContainer: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  title: {
    color: '#0D163A',
    fontSize: 24,
    fontWeight: '500',
  },
  scrollContainer: {
    paddingTop: 10,
  },
  buttonContainer: {
    marginRight: 8,
    alignItems: 'center',
  },
  normalButton: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 50,
    marginRight: 14,
    alignItems: 'center',
  },
  image: {
    width: 35,
    height: 35,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  headerContainer: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,

    marginVertical: 10,
  },
  seeAll: {
    fontSize: 16,
    color: '#007BFF',
  },
});

export default Home;
