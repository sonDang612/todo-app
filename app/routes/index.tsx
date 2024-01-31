import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import GalleryScreen from '../screens/GalleryScreen';
import HomeScreen from '../screens/HomeScreen';
import screenNames from './screenNames';
import AddNoteDetailsScreen from '../screens/AddNoteDetailsScreen';

type Route = {
  component: () => React.JSX.Element | null;
  name: string;
  options?: NativeStackNavigationOptions;
};

const routes: Route[] = [
  { component: HomeScreen, name: screenNames.HomeScreen },
];

const modalRoutes: Route[] = [
  { component: AddNoteDetailsScreen, name: screenNames.AddNoteDetailsScreen },
  {
    component: GalleryScreen,
    name: screenNames.GalleryScreen,
    options: { animation: 'ios', headerShown: true },
  },
];

export { routes, modalRoutes };
