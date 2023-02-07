import {
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Block, Text} from '@components';
import {theme} from '@theme';
import {routes} from '@navigation/routes';

const ListCommunity = () => {
  const {navigation} = useNavigation();

  const renderItem = ({item}) => {
    const {name, avatar, describe, member, status} = item;
    return (
      <Block
        row
        marginTop={30}
        backgroundColor={theme.colors.listColor}
        padding={15}
        radius={20}
        style={styles.bong}>
        <Image style={styles.image} source={{uri: avatar}} resizeMode="cover" />
        <Block
          marginHorizontal={20}
          marginTop={10}
          width={'80%'}
          paddingRight={20}>
          <Text size={20} fontType={'bold'}>
            {name}
          </Text>
          <Text
            size={14}
            lineHeight={20}
            color={theme.colors.gray2}
            style={styles.setText}>
            {describe}
          </Text>
          <Text
            size={14}
            lineHeight={20}
            color={theme.colors.gray2}
            style={styles.setText}>
            {member} Thành viên
          </Text>
          {status == true ? (
            <Block
              marginTop={10}
              radius={10}
              backgroundColor={theme.colors.buttomGroud}
              height={35}
              width={112}
              alignCenter
              justifyCenter={'center'}>
              <Pressable>
                <Text color="red" size={14} style={styles.setText}>
                  Đã tham gia
                </Text>
              </Pressable>
            </Block>
          ) : (
            <Block
              marginTop={10}
              backgroundColor={theme.colors.white}
              height={35}
              width={112}
              radius={10}
              alignCenter
              justifyCenter={'center'}>
              <Pressable>
                <Text size={14} style={styles.setText}>
                  Tham gia
                </Text>
              </Pressable>
            </Block>
          )}
        </Block>
      </Block>
    );
  };

  return (
    <Block>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => Math.random()}
        showsVerticalScrollIndicator={false}
      />
    </Block>
  );
};

export default ListCommunity;

const styles = StyleSheet.create({
  bong: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.85,

    elevation: 5,
  },
  setText: {
    fontWeight: '700',
  },
  image: {
    marginTop: 10,
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: 'black',
  },
});

var data = [
  {
    _id: '1',
    name: 'Community 1',
    avatar:
      'https://imgt.taimienphi.vn/cf/Images/huy/2020/3/19/hinh-avatar-cho-nu-dep-1.jpg',
    describe: 'Chào mừng bạn đến với cộng đồng và đây là mô tả',
    member: '10k',
    status: true,
  },
  {
    _id: '2',
    name: 'Community 2',
    avatar:
      'https://imgt.taimienphi.vn/cf/Images/huy/2020/3/19/hinh-avatar-cho-nu-dep-1.jpg',
    describe: 'Chào mừng bạn đến với cộng đồng và đây là mô tả',
    member: '10k',
    status: false,
  },
  {
    _id: '3',
    name: 'Community 3',
    avatar:
      'https://imgt.taimienphi.vn/cf/Images/huy/2020/3/19/hinh-avatar-cho-nu-dep-1.jpg',
    describe: 'Chào mừng bạn đến với cộng đồng và đây là mô tả',
    member: '10k',
    status: true,
  },
];
