import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import LineSpacer from '../components/LineSpacer';
import Button from '../components/Button';
import Note from '../components/Note';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>TODO LIST</Text>
      </View>
      <LineSpacer backgroundColor="#BDBDBD" />
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="add title for task..."
          style={styles.textInput}
        />
        <Button containerStyle={styles.addButton}>Add</Button>
      </View>
      <Note />
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
});

export default HomeScreen;
