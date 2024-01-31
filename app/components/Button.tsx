import React, { PropsWithChildren } from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
type Props = {
  textStye?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
};
const Button = (props: PropsWithChildren<Props>) => {
  const { containerStyle, textStye, children, onPress } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <View style={[styles.initialButtonContainer, containerStyle]}>
          <Text style={[styles.initialText, textStye]}>{children}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  initialButtonContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  initialText: {
    fontSize: 13,
    color: '#fff',
  },
});

export default Button;
