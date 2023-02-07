import { Block, Text, Button } from '@components';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '@components/Icon';
import { theme } from '@theme';
import { formatDay } from '@utils/helper';
const { colors } = theme;
const PADDING_ITEM = 15;

const _renderStar = num => {
  let star = [];
  for (let i = 0; i < num; i++) {
    star.push(
      <Icon
        component={'AntDesign'}
        name="star"
        color={theme.colors.yellow}
        size={16}
      />,
    );
  }
  return star;
};

const ItemComment = ({ item, index }) => {

  return (
    <Block borderBottomWidth={1} paddingBottom={20} borderColor={theme.colors.gray2}>
      <Block marginRight={PADDING_ITEM} row marginTop={20}>
        <Image
          style={styles.image}
          source={{
            uri: item.image,
          }}
        />
        <Block marginHorizontal={10}>
          <Block row>
            <Text size={15} fontType="regular">
              {item.userName}
            </Text>
            <Text size={12} color={colors.gray} marginLeft={10} marginTop={3} fontType="regular">
              {formatDay(new Date(item.time))}
              {/* {item.time} */}
            </Text>
          </Block>

          <Block row marginTop={5}>
            {_renderStar(item.evaluate)}
          </Block>
        </Block>
      </Block>
      <Block marginTop={5} marginLeft={5}>
        <Text color={colors.gray}>{item.content}</Text>
      </Block>
    </Block>
  );
};

export default ItemComment;

const styles = StyleSheet.create({
  inputSection: {
    color: colors.white,
    height: 40,
    marginHorizontal: 30,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
  },
  inputText: {
    flex: 1,
    paddingRight: 10,
  },
  iconSearch: {
    paddingHorizontal: 10,
  },
  mainView: {
    backgroundColor: colors.white,
    flex: 1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  titleSection: {
    fontSize: 18,
    color: colors.blueTitle,
    fontWeight: 'bold',
  },
  titleViewAll: {
    color: colors.orange,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
    resizeMode: 'center',
    backgroundColor: colors.gray2,
  },
  title_InView: {
    paddingTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.blueTitle,
  },
  containerBtnDetail: {
    backgroundColor: colors.orange,
    height: 35,
  },
  btnDetail: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageEventHightLight: {
    height: 68,
    width: 68,
  },
  titleEventhighlight: {
    color: colors.blueTitle,
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnItemCate: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
