/* eslint-disable react-native/no-inline-styles */
import {icons} from '@assets';
import {AnimatedImage, Block, Text} from '@components';
import Rating from '@components/Common/Rating';
import {routes} from '@navigation/routes';
import {useNavigation} from '@react-navigation/native';
import {width} from '@utils/responsive';
import React from 'react';
import {Image, Pressable} from 'react-native';
import styles from './styles';

const ProductItem = ({
  thumbnail,
  image,
  imageStyle,
  salePercent,
  price,
  priceBuy,
  title = '',
  rate = 0,
  is_new,
  style,
  item_id = '',
  hasCombo = false,
  isRate = true,
  isPriceBuy = true,
  disabled = false,
  marginBottom = 10,
  marginHorizontal = 5,
  ...props
}) => {
  const navigation = useNavigation();

  const _onPress = () =>
    navigation.navigate(routes.PRODUCT_DETAIL, {
      item_id,
      hasCombo,
    });

  return (
    <Block
      {...props}
      radius={5}
      width={(width - 34) / 2}
      marginHorizontal={marginHorizontal}
      marginBottom={marginBottom}
      style={style}
      backgroundColor="white">
      <Pressable disabled={disabled} onPress={_onPress}>
        <AnimatedImage
          thumbnail={thumbnail}
          source={image}
          style={{...styles.image, ...imageStyle}}
        />
        <Block padding={8}>
          <Text size={13} numberOfLines={2}>
            {title}
          </Text>
          {isPriceBuy && (
            <Text
              marginTop={2}
              size={15}
              numberOfLines={1}
              color="red"
              fontType="semibold">
              {priceBuy === '0' ? 'Liên hệ' : `${priceBuy} đ`}
            </Text>
          )}
          {salePercent !== '0' && (
            <Block row alignCenter marginTop={5}>
              <Block
                marginRight={6}
                paddingHorizontal={5}
                borderRadius={2}
                backgroundColor="red">
                <Text
                  size={11}
                  marginVertical={3}
                  color="white"
                  fontType="bold">
                  {Math.ceil(salePercent)}%
                </Text>
              </Block>
              <Text
                size={12}
                fontType="light"
                color="lightGray"
                style={{
                  textDecorationLine: 'line-through',
                }}>
                {price} đ
              </Text>
            </Block>
          )}
          <Block row alignCenter marginTop={5} space="between">
            {isRate && <Rating imageSize={12} startingValue={rate} />}
            {is_new === '1' && (
              <Image
                source={icons.new}
                resizeMode="contain"
                style={styles.icoNew}
              />
            )}
          </Block>
        </Block>
      </Pressable>
    </Block>
  );
};

export default ProductItem;
