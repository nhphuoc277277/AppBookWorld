import {theme} from '@theme';
import React from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import Text from '../Text';
export const Progress = ({step, steps, height, messenger}) => {
  const [width, setWidth] = React.useState(0);
  const animatedValue = React.useRef(new Animated.Value(-1000)).current;
  const reactive = React.useRef(new Animated.Value(1000)).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);
  React.useEffect(() => {
    reactive.setValue(-width + (width * step) / steps);
  }, [step, width]);
  return (
    <>
      <View style={styles.viewTex}>
        <Text style={styles.title}>{messenger}</Text>
        <Text>{step}%</Text>
      </View>
      <View style={[styles.container, {height, borderRadius: height}]}>
        <Animated.View
          onLayout={e => {
            const newWidth = e.nativeEvent.layout.width;
            setWidth(newWidth);
          }}
          style={[
            styles.progress,
            {
              height,
              borderRadius: height,
              transform: [{translateX: animatedValue}],
            },
          ]}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.bg_opacity,
    overflow: 'hidden',
  },
  progress: {
    backgroundColor: theme.colors.orange,

    overflow: 'hidden',
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  viewTex: {
    flexDirection: 'row',
    marginBottom: 7,
  },
  title: {
    flex: 1,
    fontSize: 14,
  },
});
