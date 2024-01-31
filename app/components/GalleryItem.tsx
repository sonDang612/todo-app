import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import PlayableDurationText from './PlayableDurationText';
const ATouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
export type Gallery = {
  uri: string;
  playableDuration?: number;
};
type Props = {
  gallery: Gallery;
  selectedGalleryItems: SharedValue<Gallery[]>;
  onSelectedGalleryItems: (gallery: Gallery) => void;
};
const GalleryItem = (props: Props) => {
  const { gallery, selectedGalleryItems, onSelectedGalleryItems } = props;
  const isSelected = useDerivedValue(
    () =>
      selectedGalleryItems.value.filter(item => item.uri === gallery.uri)
        .length !== 0,
    [selectedGalleryItems.value],
  );

  const aImageContainerStyle = useAnimatedStyle(() => {
    return {
      borderColor: isSelected.value ? '#0073C2' : '#fff',
    };
  });

  return (
    <ATouchableOpacity
      activeOpacity={0.7}
      style={[styles.imageContainer, aImageContainerStyle]}
      onPress={() => onSelectedGalleryItems(gallery)}>
      <Image source={{ uri: gallery.uri }} style={styles.image} />
      <PlayableDurationText playableDuration={gallery.playableDuration} />
    </ATouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    borderWidth: 2,
  },
  image: {
    flex: 1,
    height: 120,
    borderRadius: 2,
  },
});

export default React.memo(GalleryItem);
