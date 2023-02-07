import { Block } from '@components';
import React from 'react';
import ItemCateBook from './ItemCateBook';
import { NoData } from '@components';
import { useAppSelector } from 'hooks';

const TabSceneCategoryBook = ({ route }) => {
  const listBookByCategory = useAppSelector(state => state.root.book.tabList);

  return listBookByCategory?.length > 0 &&
    route._id === listBookByCategory[0]?.categoryId ? (
    <Block>
      {listBookByCategory?.map((item, index) => (
        <ItemCateBook key={item._id} item={item} />
      ))}
    </Block>
  ) : (
    <NoData title={'Không có sách'} />
  );
};

export default TabSceneCategoryBook;
