import React from 'react';
import {Block, Text} from '@components';
import {Image, StyleSheet, ScrollView} from 'react-native';

const NotificationAbout = () => {
  const renderItem = num => {
    let item = [];
    for (let i = 0; i < num; i++) {
      item.push(
        <Block style={styles.notificationAbout}>
          <Image
            style={styles.imageNoti}
            source={{
              uri: 'https://res.cloudinary.com/cao-ng-fpt-polytechnic/image/upload/v1653318098/pbpjvsmyxcjumr9pgk7j.jpg',
            }}
          />
          <Block>
            <Text style={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
            </Text>
            <Text style={styles.text}>1m ago</Text>
          </Block>
        </Block>,
      );
    }
    return item;
  };
  return (
    <Block>
      <ScrollView>{renderItem(20)}</ScrollView>
    </Block>
  );
};
const styles = StyleSheet.create({
  imageNoti: {
    height: 50,
    width: 50,
    borderRadius: 30,
  },
  notificationAbout: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  text: {
    width: 260,
  },
});
export default NotificationAbout;
