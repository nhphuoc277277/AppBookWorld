import { icons } from '@assets';
import { AnimatedImage, Block, Text } from '@components';
import { routes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import actions from '@redux/actions';
import React from 'react';
import { Image, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';

const NotificationItem = ({
  item_id,
  image,
  title,
  date_create,
  short,
  isReading,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const config = useSelector(state => state.config.data);
  const user = useSelector(state => state.tokenUser.data);

  const _onPress = () => {
    dispatch({
      type: actions.UPDATE_NOTIFICATION,
      body: {
        item_id,
      },
      params: {
        user,
        act: 'readed',
      },
    });

    dispatch({
      type: actions.CHANGE_STATUS_NOTIFICATION,
      item_id,
    });

    navigation.navigate(routes.NOTIFICATION_DETAILS_SCREEN, {
      item_id,
    });
  };

  return (
    <Pressable style={styles.container(isReading, config)} onPress={_onPress}>
      <AnimatedImage
        source={image ? image : 'https://reactnative.dev/img/tiny_logo.png'}
        style={styles.imageStyle}
      />
      <Block flex marginLeft={20}>
        <Text numberOfLines={1} fontType="heavy">
          {title}
        </Text>
        <Text numberOfLines={2} marginVertical={10} color="placeholder">
          {short}
        </Text>
        <Block row alignCenter>
          <Image
            source={icons.clock}
            style={styles.iconStyle}
            resizeMode="contain"
          />
          <Text marginLeft={5} size={12} fontType="light" color="placeholder">
            {date_create}
          </Text>
        </Block>
      </Block>
    </Pressable>
  );
};

export default NotificationItem;
