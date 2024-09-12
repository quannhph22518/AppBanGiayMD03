import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ItemOrder from '../components/item_order';

const History = ({navigation}) => {
  const [listOrder, setlistOrder] = useState([]);
  async function fetchData(params) {
    const storedToken = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    };
    try {
      const response = await axios.get(
        'http://192.168.1.9:3000/api/static/order-history',
        config,
      );
      if (response.status === 200) {
        setlistOrder(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>History</Text>
        <View style={{width: 25}}></View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={listOrder}
        keyExtractor={(item, index) => item._id || index.toString()}
        renderItem={({item}) => {
         return <ItemOrder order={item}/>
        }}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#F8F9FA',
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
  title: {
    fontSize: 22,
    fontWeight: '500',
    color: '#0D163A',
  },
});

export default History;
