import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const Search = () => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    'Nike Air Max Shoes',
    'Nike Jordan Shoes',
    'Nike Air Force Shoes',
    'Nike Club Max Shoes',
    'Snakers Nike Shoes',
    'Regular Shoes',
  ]);

  const handleSearch = text => {
    setQuery(text);
  };

  const handleSelectSearchItem = item => {
    setQuery(item);
  };

  const handleClearSearch = () => {
    setQuery('');
  };

  const handleBack = () => {};

  const handleCancel = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Search</Text>
        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
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
      <ScrollView style={styles.recentSearches}>
        <Text style={styles.subTitle}>Shoes</Text>
        {recentSearches.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.searchItem}
            onPress={() => handleSelectSearchItem(item)}>
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
