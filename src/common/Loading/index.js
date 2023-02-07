import {Block} from '@components';
import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import React from 'react';
import {Modal} from 'react-native';
import {UIActivityIndicator} from 'react-native-indicators';

const Loading = ({visible}) => {
  return (
    <Modal visible={visible} transparent={true}>
      <Block flex justifyCenter alignCenter backgroundColor="rgba(0,0,0,0.2)">
        <Block height={70} width={70} radius={5} backgroundColor="gray">
          <UIActivityIndicator
            size={getSize.s(35)}
            color={theme.colors.white}
          />
        </Block>
      </Block>
    </Modal>
  );
};

export default Loading;
