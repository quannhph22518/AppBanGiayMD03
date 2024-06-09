/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import MyCart from './MyCart';
import Checkout from './Checkout'
import notifications from './notificatiions'
import search from './search'

AppRegistry.registerComponent(appName, () => Checkout
);
