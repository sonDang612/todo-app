import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Button from './Button';
import { UserNote } from '../types';
import navigate from '../utils/navigate';
import screenNames from '../routes/screenNames';
type Props = {
  userNote: UserNote;
  deleteNote: (deletedNoteId: string) => void;
};
const Note = (props: Props) => {
  const { userNote, deleteNote } = props;
  return (
    <View style={styles.container}>
      <Text>{userNote.title}</Text>
      <View style={styles.taskManagementContainer}>
        <Button
          containerStyle={styles.editButton}
          textStyle={styles.editButtonText}
          onPress={() =>
            navigate(screenNames.AddNoteDetailsScreen, { userNote })
          }>
          Edit
        </Button>
        <Button
          containerStyle={styles.deleteButton}
          onPress={() => deleteNote(userNote.id)}>
          Delete
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#CDD4DA',
    padding: 10,
    borderRadius: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  taskManagementContainer: {
    flexDirection: 'row',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
  },
  editButton: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginRight: 5,
  },
  editButtonText: {
    color: '#000',
  },
});

export default React.memo(Note);
