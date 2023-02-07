import React from 'react';
import {Block, Text} from '@components';
import ItemChat from './ItemChat';

const TabSceneChat = ({route}) => {
  return route?.chatList?.length > 0 ? (
    <Block>
      {route?.chatList.map((item, index) => (
        <ItemChat key={index} item={item} />
      ))}
    </Block>
  ) : (
    <Text> Khong nhóm </Text>
  );
};

export default TabSceneChat;
