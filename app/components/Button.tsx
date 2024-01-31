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
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
};
const Button = (props: PropsWithChildren<Props>) => {
  const { containerStyle, textStyle, children, onPress } = props;

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={[styles.initialButtonContainer, containerStyle]}>
        <Text style={[styles.initialText, textStyle]}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  initialButtonContainer: {
    borderRadius: 5,
    backgroundColor: 'red',
  },
  initialText: {
    fontSize: 13,
    color: '#fff',
  },
});

export default Button;
