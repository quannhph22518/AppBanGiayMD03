/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import MyCart from './src/screens/MyCart';
import Checkout from './Checkout'
import notifications from './src/screens/notificatiions'
import search from './src/screens/search'

AppRegistry.registerComponent(appName, () => Checkout
);
