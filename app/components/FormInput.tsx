import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
type Props = {
  labelText: string;
} & TextInputProps;
const FormInput = (props: Props) => {
  const { labelText, style, ...textInputProps } = props;
  return (
    <View style={styles.container}>
      <Text style={[styles.title]}>{labelText}:</Text>
      <TextInput
        placeholder="your title"
        style={style ? [styles.textInput, style] : styles.textInput}
        {...textInputProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 5,
  },
  title: {
    fontSize: 16,
    flex: 1,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    flex: 2.5,
    paddingVertical: 0,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default React.memo(FormInput);
