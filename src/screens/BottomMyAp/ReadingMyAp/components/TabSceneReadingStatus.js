import { StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import EmptyIcon from '@assets/svgs/EmptyIcon';
import { Block, Text, NoData } from '@components';
import ItemCateBook from '@screens/BottomMyAp/HomeMyAp/HomeScreenMyAp/components/ItemCateBook';
import { useAppSelector } from 'hooks';
import { withNamespaces } from 'react-i18next';
const TabSceneReadingStatus = ({ route, t }) => {
  const allBooks = useAppSelector(state => state.root.book.bookList);
  return allBooks.length > 0 ? (
    <ScrollView style={styles.container}>
      {allBooks.map((item, index) => (
        <ItemCateBook key={index} item={item} />
      ))}
    </ScrollView>
  ) : (
    <Block
      flex
      justifyCenter
      alignCenter>
      <EmptyIcon />
    </Block >
  );
};
const styles = StyleSheet.create({

});
export default withNamespaces()(TabSceneReadingStatus);
