import React from 'react';
import { StyleSheet, View } from 'react-native';
type Props = {
  backgroundColor?: string;
};
const LineSpacer = (props: Props) => {
  const { backgroundColor = '#000' } = props;
  return <View style={[styles.container, { backgroundColor }]} />;
};

const styles = StyleSheet.create({
  container: {
    height: 1,
    width: '100%',
  },
});

export default LineSpacer;
