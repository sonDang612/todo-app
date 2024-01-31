import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Gallery } from './GalleryItem';
import Button from './Button';
import { useRoute } from '@react-navigation/native';
import PlayableDurationText from './PlayableDurationText';
const layout = Dimensions.get('screen');

type Props = {
  data: Gallery;
  deleteSelectedGalleryItem: (uri: string) => void;
};
const SelectedGalleryItems = (props: Props) => {
  const { data, deleteSelectedGalleryItem } = props;
  const params = useRoute().params as any;
  return (
    <View style={styles.imageContainer}>
      <Image source={{ uri: data.uri }} style={styles.image} />
      {!params?.isViewed && (
        <View style={styles.deleteButtonAbsoluteContainer}>
          <Button
            onPress={() => deleteSelectedGalleryItem(data.uri)}
            containerStyle={styles.deleteButton}>
            X
          </Button>
        </View>
      )}
      <PlayableDurationText playableDuration={data.playableDuration} />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: { width: layout.width / 3, height: 120 },
  image: { flex: 1, borderRadius: 2 },
  deleteButtonAbsoluteContainer: { position: 'absolute', left: 5, top: 5 },
  deleteButton: {
    width: 20,
    height: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
});

export default React.memo(SelectedGalleryItems);
