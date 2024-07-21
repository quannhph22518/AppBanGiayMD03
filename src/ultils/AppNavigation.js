import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AppProvider, AppContext } from '../ultils/AppContext';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../screens/Home';
import Favourite from '../screens/Favourite';
import ProductDetail from '../screens/ProductDetail';
import MyCart from '../screens/MyCart';
import Profile from '../screens/Profile';
import NotificationsScreen from '../screens/notificatiions';
import Welcome from '../screens/Welcome';
import LoadingScreen from '../screens/LoadingScreen';
import Settings from '../screens/Setting';
import Search from '../screens/search';
import ProductAll from '../screens/ProductAll';
import ForgotPass from '../screens/PassW';
import Login from '../screens/Login';
import Signup from '../screens/Signup';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const User = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Signup} />
      <Stack.Screen name="ForgotPass" component={ForgotPass} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="ProductAll" component={ProductAll} />
      <Stack.Screen name="User" component={User} />
    </Stack.Navigator>
  );
};

const FavouriteStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Favouritee" component={Favourite} />
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );
};

const getTabBarVisibility = route => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? '';

  if (
    routeName === 'Notifications' ||
    routeName === 'Search' ||
    routeName === 'ProductDetail' ||
    routeName === 'ProductAll' ||
    routeName === 'User'
  ) {
    return 'none';
  }
  return 'flex';
};

const CustomTabIcon = ({ name, size, color }) => {
  if (name === 'cart') {
    return (
      <View style={styles.customTab}>
        <Icon name="cart" size={size} color="#fff" />
      </View>
    );
  }
  return <Icon name={name} size={size} color={color} />;
};

const Main = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: [styles.tabBar, { display: getTabBarVisibility(route) }],
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case 'Homee':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Favourite':
                iconName = focused ? 'heart' : 'heart-outline';
                break;
              case 'MyCart':
                iconName = 'cart';
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
            return <CustomTabIcon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007bff',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Homee" component={HomeStack} />
        <Tab.Screen name="Favourite" component={FavouriteStack} />
        <Tab.Screen name="MyCart" component={MyCart} />
        <Tab.Screen name="NotificationsScreen" component={NotificationsScreen} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </View>
  );
};

const AppNavigation = () => {
  const {
    isCheckGetStarted,
    setIsCheckGetStarted,
    isCheckLogin,
    setIsCheckLogin,
  } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkGetStartedStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('isCheckGetStarted');
        if (value !== null) {
          setIsCheckGetStarted(value === 'true');
        }

        const storedIsCheckLogin = await AsyncStorage.getItem('isCheckLogin');
        setIsCheckLogin(storedIsCheckLogin === 'true');
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

const styles = StyleSheet.create({
  tabBar: {
    marginHorizontal: 10,
    borderRadius: 16,
    marginBottom: 10,
  },
  customTab: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,
  },
});

export default App;
