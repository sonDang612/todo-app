import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import videoPlaytimeConverter from '../utils/videoPlaytimeConverter';
type Props = {
  playableDuration?: number;
};
const PlayableDurationText = (props: Props) => {
  const { playableDuration } = props;

  if (!playableDuration) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {videoPlaytimeConverter(playableDuration)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 5,
    right: 5,
    paddingHorizontal: 5,
    borderRadius: 2,
  },
  text: { color: '#fff' },
});

export default PlayableDurationText;
