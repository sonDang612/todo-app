import React from 'react';
import { View } from 'react-native';
import Button from '../components/Button';
import navigate from '../utils/navigate';
import screenNames from '../routes/screenNames';

const HomeScreen = () => {
  return (
    <View>
      <Button onPress={() => navigate(screenNames.GalleryScreen)}>
        Go to Gallery
      </Button>
    </View>
  );
};

export default HomeScreen;
