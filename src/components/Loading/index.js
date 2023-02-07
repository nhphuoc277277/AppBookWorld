import { Block, Text } from '@components';
import { theme } from '@theme';
import { height, width } from '@utils/responsive';
import React from 'react';
import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { lotties } from '@assets';
import { useAppSelector } from '@hooks';

const Loading = () => {
  const isShow = useAppSelector(state => state.root.loading.isLoading);
  if (isShow === 'HIDE') {
    return null;
  }
  return (
    <Block
      absolute
      zIndex={9999}
      flex
      backgroundColor={theme.colors.backgroundOpacity}
      width={width}
      height={height}
      justifyCenter
      alignCenter>
      <Text color={theme.colors.white} marginBottom={10}>
        Wait me seconds...
      </Text>
      <LottieView
        source={lotties.loading_data}
        style={styles.animation}
        autoPlay
      />
    </Block>
  );
};

const styles = StyleSheet.create({
  animation: {
    width: 100,
    height: 100,
  },
});

export default Loading;
