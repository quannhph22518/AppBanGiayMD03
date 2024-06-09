import { StyleSheet, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import Favourite from '../screens/Favourite';
import ProductDetail from '../screens/ProductDetail';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Favourite') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'ProductDetail') {
              iconName = focused ? 'information-circle' : 'information-circle-outline';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Favourite" component={Favourite} />
        <Tab.Screen name="ProductDetail" component={ProductDetail} />
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
