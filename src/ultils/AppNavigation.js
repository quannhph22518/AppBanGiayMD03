import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../screens/Home';
import Favourite from '../screens/Favourite';
import ProductDetail from '../screens/ProductDetail';
import MyCart from '../screens/MyCart';
import Profile from '../screens/Profile';
import NotificationsScreen from '../screens/notificatiions';
import { AppProvider, AppContext } from '../ultils/AppContext'; 
import Welcome from '../screens/Welcome';
import LoadingScreen from '../screens/LoadingScreen'; 
import  settings  from '../screens/Setting';
import  Search  from '../screens/search';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () =>{
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Homee" component={Home} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );
}

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
                iconName = focused ? 'cart' : 'cart-outline';
                break;
              case 'NotificationsScreen':
                iconName = focused ? 'notifications' : 'notifications-outline';
                break;
              case 'Settings':
                iconName = focused ? 'person' : 'person-outline';
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
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Favourite" component={Favourite} />
        <Tab.Screen name="MyCart" component={MyCart} />
        <Tab.Screen name="NotificationsScreen" component={NotificationsScreen} />
        <Tab.Screen name="Settings" component={settings} />
      </Tab.Navigator>
    </View>
  );
};

const AppNavigation = () => {
  const { isCheckGetStarted, setIsCheckGetStarted } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkGetStartedStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('isCheckGetStarted');
        if (value !== null) {
          setIsCheckGetStarted(value === 'true');
        }
      } catch (error) {
        console.error('Error loading data', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkGetStartedStatus();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {isCheckGetStarted ? <Main /> : <Welcome />}
    </NavigationContainer>
  );
};

const App = () => (
  <AppProvider>
    <AppNavigation />
  </AppProvider>
);

export default App;
