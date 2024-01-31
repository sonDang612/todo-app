import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import uuid from 'react-native-uuid';
import Button from '../components/Button';
import LineSpacer from '../components/LineSpacer';
import ListNotes from '../components/ListNotes';
import { UserNote } from '../types';
import { useIsFocused, useRoute } from '@react-navigation/native';
type Params = {
  updatedUserNote?: UserNote;
};

const HomeScreen = () => {
  const params = useRoute().params as Params;
  const isFocused = useIsFocused();

  const [title, setTitle] = React.useState<string | undefined>(undefined);
  const [userNotes, setUserNotes] = React.useState<UserNote[]>([]);
  const textInputRef = React.useRef<TextInput | null>(null);

  const addNote = () => {
    if (title) {
      const id = uuid.v1().toString();
      setUserNotes(prev => [
        { id, title, description: '', galleryItems: [] },
        ...prev,
      ]);
      setTitle(undefined);
      textInputRef.current?.blur();
    } else {
      console.log('error');
    }
  };

  const deleteAll = () => {
    setUserNotes([]);
  };

  const deleteNote = React.useCallback((deletedNoteId: string) => {
    setUserNotes(prev => prev.filter(item => item.id !== deletedNoteId));
  }, []);

  React.useEffect(() => {
    if (isFocused && params?.updatedUserNote) {
      const updatedUserNote = params.updatedUserNote;
      setUserNotes(prev =>
        prev.map(item =>
          item.id === updatedUserNote.id ? updatedUserNote : item,
        ),
      );
    }
  }, [isFocused, params?.updatedUserNote]);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>TODO LIST</Text>
      </View>
      <LineSpacer backgroundColor="#BDBDBD" />
      <View style={styles.textInputContainer}>
        <TextInput
          ref={textInputRef}
          placeholder="add title for task..."
          style={styles.textInput}
          onChangeText={setTitle}
          value={title}
        />
        <Button containerStyle={styles.addButton} onPress={addNote}>
          Add
        </Button>
        <Button containerStyle={styles.deleteButton} onPress={deleteAll}>
          Delete All
        </Button>
      </View>

      <ListNotes deleteNote={deleteNote} userNotes={userNotes} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  titleContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  textInputContainer: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#BDBDBD',
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
  },
  addButton: {
    flex: 1,
    paddingHorizontal: 15,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  deleteButton: {
    flex: 1,
    paddingHorizontal: 10,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});

export default HomeScreen;
