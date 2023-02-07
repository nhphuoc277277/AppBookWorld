import { Block, Text } from '@components';
import { theme } from '@theme';
import React from 'react';
import { Image } from 'react-native';
import { images } from '@assets';
const NoData = ({ title }) => {
  return (
    <Block flex>
      <Block justifyCenter alignCenter flex>
        <Text marginBottom={15} size={16} color={theme.colors.gray}>
          {title}
        </Text>
        <Image
          style={{
            width: 50,
            height: 50,
          }}
          source={images.ic_book}
        />
      </Block>
    </Block>
  );
};

export default NoData;
