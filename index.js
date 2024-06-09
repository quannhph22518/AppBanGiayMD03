/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import MyCart from './src/screens/MyCart';
import notifications from './src/screens/notificatiions'
import search from './src/screens/search'
import Checkout from './src/screens/Checkout';

AppRegistry.registerComponent(appName, () => Checkout
);
