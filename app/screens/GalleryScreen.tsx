import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  SharedValue,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import ArrowBack from '../assets/svg/ArrowBack.svg';
import GalleryItem, { Gallery } from '../components/GalleryItem';
import useGallery from '../hooks/useGallery';
import screenNames from '../routes/screenNames';
import navigate from '../utils/navigate';
type Params = {
  galleryItems: Gallery[];
};
const GalleryScreen = () => {
  const params = useRoute().params as Params;
  const { data, noMore, onEndReached } = useGallery({ type: 'All' });
  const navigation = useNavigation();
  const selectedGalleryItems = useSharedValue<Gallery[]>([]);

  const onSelectedGalleryItems = React.useCallback(
    (gallery: Gallery) => {
      const isSelected =
        selectedGalleryItems.value.filter(item => item.uri === gallery.uri)
          .length !== 0;
      if (isSelected) {
        selectedGalleryItems.value = selectedGalleryItems.value.filter(
          item => item.uri !== gallery.uri,
        );
      } else {
        selectedGalleryItems.value = [...selectedGalleryItems.value, gallery];
      }
    },
    [selectedGalleryItems],
  );

  const renderItem: ListRenderItem<Array<PhotoIdentifier>> = React.useCallback(
    ({ item }) => {
      const node = item[0].node;
      return (
        <GalleryItem
          gallery={{
            uri: node.image.uri,
            playableDuration: node.image.playableDuration,
          }}
          selectedGalleryItems={selectedGalleryItems}
          onSelectedGalleryItems={onSelectedGalleryItems}
        />
      );
    },
    [selectedGalleryItems, onSelectedGalleryItems],
  );

  React.useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <HeaderRight selectedGalleryItems={selectedGalleryItems} />
      ),
      headerLeft: HeaderLeft,
    });
  }, [navigation, selectedGalleryItems]);

  React.useEffect(() => {
    selectedGalleryItems.value = params.galleryItems || [];
  }, [params.galleryItems, selectedGalleryItems]);

  const listFooterComponent = React.useCallback(() => {
    if (!noMore) {
      return <ActivityIndicator size="small" />;
    }
    return <View style={styles.footerContainer} />;
  }, [noMore]);

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        numColumns={3}
        ListFooterComponent={listFooterComponent}
        onEndReached={onEndReached}
      />
    </View>
  );
};

const HeaderRight = ({
  selectedGalleryItems,
}: {
  selectedGalleryItems: SharedValue<Gallery[]>;
}) => {
  const [disabled, setDisabled] = React.useState(true);
  const notEmpty = useDerivedValue(
    () => selectedGalleryItems.value.length !== 0,
  );

  useAnimatedReaction(
    () => notEmpty.value,
    result => {
      if (result) {
        runOnJS(setDisabled)(false);
      } else if (!result) {
        runOnJS(setDisabled)(true);
      }
    },
  );

  const aTextStyle = useAnimatedStyle(() => {
    return {
      fontWeight: notEmpty.value ? '500' : '400',
      color: notEmpty.value ? '#00686E' : '#BDBDBD',
    };
  }, []);

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      onPress={() =>
        navigate(screenNames.AddNoteDetailsScreen, {
          selectedGalleryItems: selectedGalleryItems.value,
        })
      }>
      <Animated.Text style={aTextStyle}>Confirm</Animated.Text>
    </TouchableOpacity>
  );
};
const HeaderLeft = () => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigate(screenNames.AddNoteDetailsScreen)}>
      <ArrowBack width={20} height={20} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  footerContainer: { height: 1 },
});

export default GalleryScreen;
