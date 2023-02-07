import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ItemAuthor from './ItemAuthor';
import EmptyIcon from '@assets/svgs/EmptyIcon';
import { Block, NoData } from '@components';
import { useGetAllAuthorQuery } from '@redux/servicesNew';
import { useAppSelector } from '@hooks';
const TapScenceAuthor = ({ route }) => {

  // const { data: getAllAuthor } = useGetAllAuthorQuery();
  const authors = useAppSelector(state => state.root.author.authors);
  return authors?.length > 0 ? (
    <ScrollView style={styles.container}>
      {authors?.map((item, index) => (
        <ItemAuthor key={index} item={item} />
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
  container: {
    paddingHorizontal: 10
  }
});

export default TapScenceAuthor;

