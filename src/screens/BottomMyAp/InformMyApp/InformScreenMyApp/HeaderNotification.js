import React from 'react';
import {Block, Text} from '@components';
import {StyleSheet} from 'react-native';
const HeaderNotification = () => {
  return (
    <Block alignCenter marginTop={50}>
      <Text style={styles.texts}>Notification</Text>
    </Block>
  );
};
const styles = StyleSheet.create({
  texts: {
    fontSize: 30,
  },
});

export default HeaderNotification;
