import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import GradientButton from '../components/gradientButton';
import SearchBar from '../components/SearchBar';
import ProductCardPopular from '../components/ProductCardPopular';
import ProductCardArrival from '../components/ProductCardArrival';

const Home = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [popularProducts, setPopularProducts] = useState([]);
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://192.168.0.149:5000/api/brand/');
        const formattedCategories = response.data.map(cat => ({
          name: cat.title,
          image: { uri: cat.image },
        }));
        setCategories(formattedCategories);
        setActiveCategory(formattedCategories[0]?.name || '');
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (activeCategory) {
      const fetchProducts = async () => {
        try {
          const [popularResponse, newArrivalResponse] = await Promise.all([
            axios.get(`http://192.168.0.149:5000/api/product/tag/${activeCategory}/popular`),
            axios.get(`http://192.168.0.149:5000/api/product/tag/${activeCategory}/new-arrivals`),
          ]);

          const formatProducts = (products) =>
            products.map(product => ({
              id: product._id,
              title: product.title,
              image: { uri: product.images[0]?.url || '' },
              price: product.price,
            }));

          setPopularProducts(formatProducts(popularResponse.data).slice(0, 2));
          setNewArrivalProducts(formatProducts(newArrivalResponse.data).slice(0, 2));
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

      fetchProducts();
    }
  }, [activeCategory]);

  const handleItemProduct = (id) => {
    navigation.navigate('ProductDetail', { id });
  };

  const handleSearch = () => {
    navigation.navigate('Search');
  };

  const handleNotification = () => {
    navigation.navigate('Notifications');
  };

  const handlePopular = () => {
    navigation.navigate('ProductAll', {
      header: 'Popular Shoes',
      titleProduct: 'Best Seller',
      brand: activeCategory,
      category: 'popular',
    });
  };

  const handleArrival = () => {
    navigation.navigate('ProductAll', {
      header: 'New Arrivals',
      titleProduct: 'Best Choice',
      brand: activeCategory,
      category: 'new-arrivals',
    });
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
          <TouchableOpacity style={styles.iconContainer} onPress={handleNotification}>
            <Ionicons name="notifications-outline" size={24} color="black" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* search */}
        <SearchBar onPress={handleSearch} />

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
          <TouchableOpacity onPress={handlePopular}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Product Cards Popular */}
        <View style={{ marginLeft: 25, marginTop: 10 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {popularProducts.map((product, index) => (
              <ProductCardPopular key={index} product={product} onPress={() => handleItemProduct(product.id)} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.headerContainer}>
          <Text style={styles.title}>New Arrivals</Text>
          <TouchableOpacity onPress={handleArrival}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Product Cards Arrival */}
        <View style={{ marginLeft: 25, marginTop: 10, marginBottom: 20 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {newArrivalProducts.map((product, index) => (
              <ProductCardArrival key={index} product={product} onPress={() => handleItemProduct(product.id)} />
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
    backgroundColor: '#F8F9FA',
    marginBottom: 20,
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
    shadowOffset: { width: 0, height: 2 },
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
    backgroundColor: '#007BFF',
    padding: 3,
    borderRadius: 50,
  },
  normalButton: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 50,
    marginRight: 18,
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
  normalText: {
    color: 'black',
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
