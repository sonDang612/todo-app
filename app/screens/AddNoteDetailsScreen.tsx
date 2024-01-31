import { useRoute } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { navigationRef } from '../../App';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import screenNames from '../routes/screenNames';
import { UserNote } from '../types';
import navigate from '../utils/navigate';
import GalleryIcon from '../assets/svg/GalleryIcon.svg';
type Params = {
  userNote: UserNote;
};
const AddNoteDetailsScreen = () => {
  const params = useRoute().params as Params;
  const { userNote } = params;
  const [title, setTitle] = React.useState<string | undefined>(undefined);
  const [description, setDescription] = React.useState<string | undefined>(
    undefined,
  );

  const onSave = () => {
    const updatedUserNote: UserNote = { ...userNote };
    let isDataChanged = false;
    if (title) {
      isDataChanged = true;
      updatedUserNote.title = title;
    }
    if (description) {
      isDataChanged = true;
      updatedUserNote.description = description;
    }

    if (isDataChanged) {
      navigate(screenNames.HomeScreen, { updatedUserNote });
    } else {
      navigationRef.goBack();
    }
  };

  React.useEffect(() => {
    setTitle(userNote.title);
    setDescription(userNote.description);
  }, [userNote]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.shadowContainer}
      onPress={() => navigationRef.goBack()}>
      <View style={styles.screenContainer}>
        <TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <Text style={styles.idText}>{userNote.id}</Text>
            <View style={styles.formContainer}>
              <FormInput
                labelText="Title"
                placeholder="your title"
                value={title}
                onChangeText={setTitle}
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
              />
              <View style={styles.mediaContainer}>
                <Button
                  containerStyle={styles.mediaButton}
                  onPress={() => navigate(screenNames.GalleryScreen)}>
                  <GalleryIcon width={16} height={16} fill={'#fff'} />
                </Button>
              </View>
            </View>
            <Button containerStyle={styles.saveButton} onPress={onSave}>
              Save
            </Button>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  shadowContainer: {
    flex: 1,
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
    flexDirection: 'row-reverse',
  },
  mediaButton: {
    backgroundColor: '#000',
    paddingVertical: 4,
    paddingHorizontal: 15,
  },
});

export default AddNoteDetailsScreen;
