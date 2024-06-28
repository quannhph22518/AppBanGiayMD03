import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchBar = ({ onPress }) => {
  
  return (
    <TouchableOpacity style={styles.searchContainer} onPress={onPress}>
      <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
      <Text style={styles.placeholderText}>Looking for shoes</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 17,
    margin: 10,
    elevation: 5,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, 
    shadowRadius: 5, 
  },
  searchIcon: {
    marginLeft: 10,
  },
  placeholderText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#888',
  },
});

export default SearchBar;
