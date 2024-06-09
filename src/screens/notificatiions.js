import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

const notifications = [
  {
    id: '1',
    image:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png',
    title: 'We Have New Products With Offers',
    time: '6 min ago',
    price: '364.95',
    discount: '260.00',
    isNew: true,
    date: 'Today',
  },
  {
    id: '2',
    image:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b5ab0a6c-6393-4af6-abbc-4f1acaa6ed94/air-max-dawn-shoes-tx7TpB.png',
    title: 'We Have New Products With Offers',
    time: '26 min ago',
    price: '364.95',
    discount: '260.00',
    isNew: true,
    date: 'Today',
  },
  {
    id: '3',
    image:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e4060b19-289e-43b4-8375-c047c1cf6ab6/air-max-pulse-shoes-2bZSZV.png',
    title: 'We Have New Products With Offers',
    time: '4 day ago',
    price: '364.95',
    discount: '260.00',
    isNew: false,
    date: 'Yesterday',
  },
  {
    id: '4',
    image:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/3f3e7049-5c99-428c-abcd-e246b086f2ed/air-force-1-07-shoes-VWCc04.png',
    title: 'We Have New Products With Offers',
    time: '4 day ago',
    price: '364.95',
    discount: '260.00',
    isNew: false,
    date: 'Yesterday',
  },
];

const NotificationItem = ({item}) => (
  <View style={styles.notificationItem}>
    <Image source={{uri: item.image}} style={styles.image} />
    <View style={styles.textContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>
        ${item.price} <Text style={styles.discount}>${item.discount}</Text>
      </Text>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{item.time}</Text>
        {item.isNew && <View style={styles.newIndicator} />}
      </View>
    </View>
  </View>
);

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.clearText}>Clear All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <>
            {item.id === '1' && <Text style={styles.dateHeader}>Today</Text>}
            {item.id === '3' && (
              <Text style={styles.dateHeader}>Yesterday</Text>
            )}
            <NotificationItem item={item} />
          </>
        )}
      />
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  clearText: {
    fontSize: 16,
    color: '#007BFF',
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  discount: {
    textDecorationLine: 'line-through',
    color: '#ff0000',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
  newIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007BFF',
    marginLeft: 5,
  },
});
