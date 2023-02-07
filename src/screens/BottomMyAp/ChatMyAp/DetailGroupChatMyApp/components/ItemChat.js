import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Block, Button} from '@components';
import {theme} from '@theme';
import {routes} from '@navigation/routes';
import {useNavigation} from '@react-navigation/native';

const {colors} = theme;
const PADDING_ITEM = 15;

const ItemChat = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(routes.DETAIL_GROUP_CHAT_MY_APP)}>
      <Block marginRight={PADDING_ITEM} row marginTop={20}>
        <Image
          style={styles.image}
          source={{
            uri: item.avatar,
          }}
        />
        <Block marginHorizontal={10}>
          <Text size={18} fontType="bold">
            {item.name}
          </Text>
          <Text size={14} color={colors.dark}>
            {item.newMessage}
          </Text>
        </Block>
      </Block>
    </TouchableOpacity>
  );
};

export default ItemChat;

const styles = StyleSheet.create({});
