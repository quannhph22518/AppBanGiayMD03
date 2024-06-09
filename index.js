/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Home from './src/screens/Home';
import ProductDetail from './src/screens/ProductDetail';
import Favourite from './src/screens/Favourite';
import AppNavigation from './src/ultils/AppNavigation';


AppRegistry.registerComponent(appName, () => AppNavigation);
