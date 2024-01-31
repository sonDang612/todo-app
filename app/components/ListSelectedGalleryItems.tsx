import React from 'react';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import { Gallery } from './GalleryItem';
import SelectedGalleryItems from './SelectedGalleryItems';
type Props = {
  data?: Gallery[];
  deleteSelectedGalleryItem: (uri: string) => void;
};
const ListSelectedGalleryItems = (props: Props) => {
  const { data, deleteSelectedGalleryItem } = props;
  const renderItem: ListRenderItem<Gallery> = React.useCallback(
    ({ item }) => {
      return (
        <SelectedGalleryItems
          data={item}
          deleteSelectedGalleryItem={deleteSelectedGalleryItem}
        />
      );
    },
    [deleteSelectedGalleryItem],
  );
  return (
    <FlatList
      horizontal
      data={data}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.itemSpace}
    />
  );
};

const styles = StyleSheet.create({
  itemSpace: { gap: 5 },
});

export default ListSelectedGalleryItems;
