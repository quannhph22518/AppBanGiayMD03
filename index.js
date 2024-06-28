/**
 * @format
 */

import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import MyCart from './src/screens/MyCart';
import notifications from './src/screens/notificatiions'
import search from './src/screens/search'
import Checkout from './src/screens/Checkout';

import Home from './src/screens/Home';
import ProductDetail from './src/screens/ProductDetail';
import Favourite from './src/screens/Favourite';
import AppNavigation from './src/ultils/AppNavigation';
import Login from './src/screens/Login';

// welcome, login... 1 phần màn hình đang tạm tời gộp chung bên App
import App from './App';
import Signup from './src/screens/Signup';

AppRegistry.registerComponent(appName, () => AppNavigation);



