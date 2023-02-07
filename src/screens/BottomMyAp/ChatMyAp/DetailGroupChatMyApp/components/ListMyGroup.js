import {StyleSheet, Image, FlatList} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Block, Text} from '@components';
import {theme} from '@theme';

const ListMyGroup = () => {
  const {navigation} = useNavigation();

  const renderItem = ({item}) => {
    const {name, avatar, newMessage, time, status} = item;

    return (
      <Block row marginTop={30}>
        <Image style={styles.image} source={{uri: avatar}} resizeMode="cover" />
        <Block marginHorizontal={20} marginTop={10} width={'55%'}>
          <Text size={16} fontType={'bold'}>
            {name}
          </Text>
          <Text size={12} numberOfLines={1} marginTop={5}>
            {newMessage}
          </Text>
        </Block>
        <Block alignCenter marginTop={10}>
          {status == true ? (
            <Block
              backgroundColor={theme.colors.green}
              height={12}
              width={12}
              radius={15}
            />
          ) : (
            <Block
              backgroundColor={theme.colors.red}
              height={12}
              width={12}
              radius={15}
            />
          )}
          <Text marginTop={10}>{time}</Text>
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

export default ListMyGroup;

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: 'black',
  },
});

var data = [
  {
    _id: 'group01',
    name: 'Group 1',
    avatar:
      'https://image-us.24h.com.vn/upload/1-2022/images/2022-03-16/baukrysie_275278910_3174792849424333_1380029197326773703_n-1647427653-670-width1440height1800.jpg',
    newMessage: 'Hello my friend',
    time: '1h',
    status: true,
  },
  {
    _id: 'group02',
    name: 'Group 2',
    avatar:
      'https://pdp.edu.vn/wp-content/uploads/2021/05/hinh-anh-avatar-nam-1-600x600.jpg',
    newMessage: 'Hello my friend',
    time: '1h',
    status: false,
  },
  {
    _id: 'group03',
    name: 'Group 3',
    avatar:
      'https://pdp.edu.vn/wp-content/uploads/2021/05/hinh-anh-avatar-nam-1-600x600.jpg',
    newMessage: 'Hello my friend',
    time: '1h',
    status: true,
  },
  {
    _id: 'group04',
    name: 'Group 4',
    avatar:
      'https://pdp.edu.vn/wp-content/uploads/2021/05/hinh-anh-avatar-nam-1-600x600.jpg',
    newMessage: 'Hello my friend',
    time: '1h',
    status: true,
  },
  {
    _id: 'group02',
    name: 'Group 2',
    avatar:
      'https://pdp.edu.vn/wp-content/uploads/2021/05/hinh-anh-avatar-nam-1-600x600.jpg',
    newMessage: 'Hello my friend',
    time: '1h',
    status: false,
  },
  {
    _id: 'group02',
    name: 'Group 2',
    avatar:
      'https://pdp.edu.vn/wp-content/uploads/2021/05/hinh-anh-avatar-nam-1-600x600.jpg',
    newMessage: 'Hello my friend',
    time: '1h',
    status: false,
  },
  {
    _id: 'group05',
    name: 'Group 5',
    avatar:
      'https://pdp.edu.vn/wp-content/uploads/2021/05/hinh-anh-avatar-nam-1-600x600.jpg',
    newMessage: 'Me wanna eat ice cream, soo...aaaaaaaaaaaaaaaaaaa',
    time: '1h',
    status: true,
  },
];
