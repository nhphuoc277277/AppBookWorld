import React from 'react';
import {Animated} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';

const AnimatedImage = ({
  source,
  thumbnail,
  resizeMode,
  style,
  containerStyles,
}) => {
  const thumbnailAnimated = new Animated.Value(0);
  const imageAnimated = new Animated.Value(0);
  const resize = resizeMode
    ? FastImage.resizeMode[resizeMode]
    : FastImage.resizeMode.cover;

  const onThumbnailLoad = () => {
    Animated.timing(thumbnailAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={containerStyles}>
      <Animated.View
        style={[styles.imageOverlay, {opacity: thumbnailAnimated}]}>
        <FastImage
          source={{uri: thumbnail}}
          style={style}
          resizeMode={resize}
          onLoadStart={onThumbnailLoad}
          blurRadius={1}
        />
      </Animated.View>
      <Animated.View style={{opacity: imageAnimated}}>
        <FastImage
          source={{uri: source}}
          style={style}
          resizeMode={resize}
          onLoadEnd={onImageLoad}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default AnimatedImage;
