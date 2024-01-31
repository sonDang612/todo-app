import GalleryScreen from '../screens/GalleryScreen';
import HomeScreen from '../screens/HomeScreen';
import screenNames from './screenNames';

const routes = [
  { component: HomeScreen, name: screenNames.HomeScreen },
  { component: GalleryScreen, name: screenNames.GalleryScreen },
];

export default routes;
