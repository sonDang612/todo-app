import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GalleryIcon from '../assets/svg/GalleryIcon.svg';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { Gallery } from '../components/GalleryItem';
import ListSelectedGalleryItems from '../components/ListSelectedGalleryItems';
import screenNames from '../routes/screenNames';
import { UserNote } from '../types';
import navigate from '../utils/navigate';
const layout = Dimensions.get('screen');
type Params = {
  userNote?: UserNote;
  selectedGalleryItems?: Gallery[];
  isViewed?: boolean;
};
const AddNoteDetailsScreen = () => {
  const params = useRoute().params as Params;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [noteId, setNoteId] = React.useState<string | undefined>(undefined);
  const [title, setTitle] = React.useState<string | undefined>(undefined);
  const [description, setDescription] = React.useState<string | undefined>(
    undefined,
  );
  const [galleryItems, setGalleryItems] = React.useState<Gallery[]>([]);

  const onSave = () => {
    const updatedUserNote = { id: noteId, description, title, galleryItems };
    navigate(screenNames.HomeScreen, { updatedUserNote });
  };

  const deleteSelectedGalleryItem = React.useCallback((uri: string) => {
    setGalleryItems(prev => prev.filter(item => item.uri !== uri));
  }, []);

  React.useEffect(() => {
    if (isFocused) {
      if (params?.selectedGalleryItems) {
        setGalleryItems(params?.selectedGalleryItems);
      }

      if (params?.userNote) {
        const userNote = params.userNote;
        setNoteId(userNote.id);
        setTitle(userNote.title);
        setDescription(userNote.description);
        setGalleryItems(userNote.galleryItems);
      }
    }
  }, [isFocused, params?.userNote, params?.selectedGalleryItems, navigation]);
  return (
    <>
      <View style={styles.screenContainer}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigate(screenNames.HomeScreen)}
          style={styles.overlay}
        />
        <>
          <View style={styles.modalContainer}>
            {params?.isViewed && <Text style={styles.viewMode}>View Mode</Text>}
            <Text style={styles.idText}>{noteId}</Text>
            <View style={styles.formContainer}>
              <FormInput
                labelText="Title"
                placeholder="your title"
                value={title}
                onChangeText={setTitle}
                editable={!params?.isViewed}
              />
              <FormInput
                labelText="Description"
                placeholder="your description"
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                style={styles.descriptionTextInput}
                value={description}
                onChangeText={setDescription}
                editable={!params?.isViewed}
              />
              {!params?.isViewed && (
                <View style={styles.mediaContainer}>
                  <Button
                    containerStyle={styles.mediaButton}
                    onPress={() =>
                      navigate(screenNames.GalleryScreen, { galleryItems })
                    }>
                    <GalleryIcon width={16} height={16} fill={'#fff'} />
                  </Button>
                </View>
              )}
              <ListSelectedGalleryItems
                data={galleryItems}
                deleteSelectedGalleryItem={deleteSelectedGalleryItem}
              />
            </View>
            {!params?.isViewed && (
              <Button containerStyle={styles.saveButton} onPress={onSave}>
                Save
              </Button>
            )}
          </View>
        </>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadowContainer: {
    flex: 1,
  },
  viewMode: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 20,
    color: 'blue',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
  },
  idText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },
  formContainer: {
    gap: 10,
    marginTop: 10,
  },
  descriptionTextInput: {
    paddingTop: 5,
  },
  saveButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  mediaContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  mediaButton: {
    backgroundColor: '#000',
    paddingVertical: 4,
    paddingHorizontal: 15,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    width: layout.width,
    height: layout.height,
    backgroundColor: 'rgba(0, 0, 0,0.5)',
  },
});

export default AddNoteDetailsScreen;
