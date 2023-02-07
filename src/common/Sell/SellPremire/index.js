import React, {useState, useEffect} from 'react';
import {Block, Text, Button} from '@components';
import {StyleSheet, ImageBackground} from 'react-native';
import {images} from '@assets';
import {theme} from '@theme';
import IconView from '@components/Icon';

const {colors, fonts} = theme;

const SellPremire = ({pTop}) => {
  return (
    <Block style={[styles.container, pTop ? {paddingTop: pTop} : null]}>
      <ImageBackground
        source={images.bg_sell}
        style={styles.bg_sell}
        imageStyle={styles.border_bg_sell}>
        <Block width={'100%'} alignCenter>
          <Block space={'between'} row width={'100%'}>
            <Block
              backgroundColor={colors.lightGreen1}
              style={styles.borderPersent}
              width={120}
              alignCenter
              justifyCenter>
              <Text
                size={16}
                marginHorizontal={5}
                color={colors.yellow}
                fontType={'bold'}>
                GIAM 20%
              </Text>
            </Block>

            <Block row marginTop={10}>
              <IconView
                component={'Fontisto'}
                name={'stopwatch'}
                size={20}
                color={colors.yellow}
              />
              <Text
                marginHorizontal={10}
                marginRight={20}
                color={colors.yellow}>
                00:13:21 CH
              </Text>
            </Block>
          </Block>
          <Text marginTop={15} color={colors.white} size={20}>
            GOI UU DAI SAP SAN 1 NAM
          </Text>
          <Text
            marginTop={5}
            color={colors.lightGray}
            size={16}
            style={styles.textDecoration}>
            600.000 VND
          </Text>
          <Text marginTop={5} color={colors.white} size={24} fontType={'bold'}>
            499.000 VND
          </Text>
          <Button style={styles.btnBuyNow}>
            <Text color={colors.white} size={16} fontType={'regular'}>
              Mua Ngay
            </Text>
          </Button>
        </Block>
      </ImageBackground>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    height: 200,
  },
  bg_sell: {
    width: '100%',
    height: 190,
    zIndex: 0,
    flex: 1,
    resizeMode: 'cover',
  },
  border_bg_sell: {
    borderRadius: 20,
  },
  borderPersent: {
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  textDecoration: {
    textDecorationLine: 'line-through',
    textDecorationColor: 'black',
  },
  btnBuyNow: {
    borderRadius: 8,
    backgroundColor: colors.lightGreen1,
    paddingHorizontal: 30,
    paddingVertical: 8,
    marginTop: 5,
  },
});

export default SellPremire;
