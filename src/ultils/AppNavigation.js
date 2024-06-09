import { StyleSheet, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // Ensure this package is installed
import Home from '../screens/Home';
import Favourite from '../screens/Favourite';
import ProductDetail from '../screens/ProductDetail';
import MyCart from '../screens/MyCart';

import Profile from '../screens/Profile';
import NotificationsScreen from '../screens/notificatiions';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Favourite':
                iconName = focused ? 'heart' : 'heart-outline';
                break;
            
              case 'MyCart':
                iconName = focused ? 'cart' : 'cart-outline';  // Icon for MyCart
                break;
              case 'NotificationsScreen':
                iconName = focused ? 'notifications' : 'notifications-outline';  // Icon for Notifications
                break;
              case 'Profile':
                iconName = focused ? 'person' : 'person-outline';  // Icon for Profile
                break;
              default:
                iconName = 'ban';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007bff',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Favourite" component={Favourite} />
        <Tab.Screen name="MyCart" component={MyCart} />
        <Tab.Screen name="NotificationsScreen" component={NotificationsScreen} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </View>
  );
};

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
};

export default AppNavigation;
