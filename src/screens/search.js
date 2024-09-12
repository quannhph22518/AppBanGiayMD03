import axios from 'axios';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import ProductCardArrival from '../components/ProductCardArrival';

const Search = ({navigation}) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  let timeout;
  const handleSearch = text => {
    setQuery(text);
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      if (text) {
        try {
          setIsLoading(true)
          const response = await axios.get(
            `http://192.168.1.9:3000/api/product/search?keyword=${text}`,
          );
          // console.log(response.data);

          setRecentSearches(response.data);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false)
        }
      }
    }, 1000);
  };

  const handleSelectSearchItem = item => {
    setQuery(item);
  };

  const handleClearSearch = () => {
    setQuery('');
  };

  const handleBack = navigation => {
    navigation.goBack();
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => handleBack(navigation)}
          style={styles.backButton}>
          <Text style={styles.backButtonText}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Search</Text>
        <TouchableOpacity
          onPress={() => handleBack(navigation)}
          style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Your Shoes"
        value={query}
        onChangeText={handleSearch}
        autoFocus={true}
      />
      <Text>Shoe</Text>
      {isLoading?
      <ActivityIndicator/>
      :<FlatList
        showsVerticalScrollIndicator={false}
        data={recentSearches}
        keyExtractor={(item, index) => item._id || index.toString()}
        renderItem={({item}) => {
          const product = {
            title: item.title || 'Unknown Product',
            price: item.price || 0,
            image:
              item.images?.[0]?.url ||
              'https://demofree.sirv.com/nope-not-here.jpg',
          };

          return (
            <ProductCardArrival
              key={item._id}
              isValidUrl={true}
              product={product}
              onPress={() =>
                navigation.navigate('ProductDetail', {id: item._id})
              }
            />
          );
        }}
      />}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 10,
  },
  cancelButtonText: {
    fontSize: 18,
    color: 'blue',
  },
  searchInput: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  recentSearches: {
    flex: 1,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  searchItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});
