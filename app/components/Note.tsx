import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Button from './Button';

const Note = () => {
  return (
    <View style={styles.container}>
      <Text>Task 1</Text>
      <View style={styles.taskManagementContainer}>
        <Button
          containerStyle={styles.editButton}
          textStyle={styles.editButtonText}>
          Edit
        </Button>
        <Button containerStyle={styles.deleteButton}>Delete</Button>
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

export default Note;
