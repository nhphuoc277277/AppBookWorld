import { Block, Text } from '@components';
import React, { useState, useEffect, useCallback } from 'react';
import { theme } from '@theme';
import { StyleSheet } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import TabSceneReadingStatus from './TabSceneReadingStatus';
import TapScenceAuthor from './TapScenceAuthor';
import { useDispatch } from 'react-redux';
import actions from '@redux/actions';
import { makeStyles, useTheme } from 'themeNew';
import { useAppSelector } from '@hooks';
import TapScreenFavoriteBook from './TapScreenFavoriteBook';


const TapReadingStatus = () => {
  const [routes, setRoutes] = useState([{ key: 'Default', title: 'Default' }]);
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const themeStore = useAppSelector(state => state.root.themeApp.theme);
  const themeNew = useTheme(themeStore);
  const dataListCate = {
    data: [
      {
        _id: 'cate01',
        name: 'Sách đang đọc',
      },
      {
        _id: 'cate02',
        name: 'Sách yêu thích',
      },
      {
        _id: 'cate03',
        name: 'Tác giả',
      },
    ],
    book: [
      {
        _id: '12',
        categoryId: 'cate01',
        banner:
          'https://uploads-ssl.webflow.com/5ee67a4ca605db1097d0d827/612b5cf9e84a8fb37e685919_Rich-Dad-Poor-Dad-1000x1000.jpg',
        name: 'Rich Dad Poor Dad',
        name_author: 'Robert T.Kiyosaki',
        evalue: '4.5',
        numPage: 234,
        numView: 21000,
      },
      {
        _id: '21',
        categoryId: 'cate01',
        banner:
          'https://uploads-ssl.webflow.com/5ee67a4ca605db1097d0d827/612b5cf9e84a8fb37e685919_Rich-Dad-Poor-Dad-1000x1000.jpg',
        name: 'Rich Dad Poor Dad',
        name_author: 'Robert T.Kiyosaki',
        evalue: '4.5',
        numPage: 234,
        numView: 21000,
      },
      {
        _id: '12',
        categoryId: 'cate01',
        banner:
          'https://uploads-ssl.webflow.com/5ee67a4ca605db1097d0d827/612b5cf9e84a8fb37e685919_Rich-Dad-Poor-Dad-1000x1000.jpg',
        name: 'Rich Dad Poor Dad',
        name_author: 'Robert T.Kiyosaki',
        evalue: '4.5',
        numPage: 234,
        numView: 21000,
      },
      {
        _id: '12',
        categoryId: 'cate01',
        banner:
          'https://uploads-ssl.webflow.com/5ee67a4ca605db1097d0d827/612b5cf9e84a8fb37e685919_Rich-Dad-Poor-Dad-1000x1000.jpg',
        name: 'Rich Dad Poor Dad',
        name_author: 'Robert T.Kiyosaki',
        evalue: '4.5',
        numPage: 234,
        numView: 21000,
      },
      {
        _id: '21',
        categoryId: 'cate01',
        banner:
          'https://uploads-ssl.webflow.com/5ee67a4ca605db1097d0d827/612b5cf9e84a8fb37e685919_Rich-Dad-Poor-Dad-1000x1000.jpg',
        name: 'Rich Dad Poor Dad',
        name_author: 'Robert T.Kiyosaki',
        evalue: '4.5',
        numPage: 234,
        numView: 21000,
      },
      {
        _id: '12',
        categoryId: 'cate01',
        banner:
          'https://uploads-ssl.webflow.com/5ee67a4ca605db1097d0d827/612b5cf9e84a8fb37e685919_Rich-Dad-Poor-Dad-1000x1000.jpg',
        name: 'Rich Dad Poor Dad',
        name_author: 'Robert T.Kiyosaki',
        evalue: '4.5',
        numPage: 234,
        numView: 21000,
      },
    ],
    isLoading: false,
  };
  const myInfo = useAppSelector(state => state.root.auth);
  console.log("myInfooooooooooooooooooooo", myInfo.token);

  const formatRouter = data => {
    return data?.map(item => {
      return {
        key: item._id,
        title: item.name,
        bookList:
          item._id === dataListCate?.book[1]?.categoryId
            ? dataListCate.book
            : [],
        ...item,
      };
    });
  };

  const _renderLabel = useCallback(
    ({ route, focused, color }) => {
      return (
        <Block>
          <Text fontType='medium1' color={focused ? themeNew.colors.primary : themeNew.colors.grey9}
            size={15}>
            {route.title}
          </Text>
        </Block>
      );
    },
    // [themeNew.colors.grey10, themeNew.colors.primary],
  );

  useEffect(() => {
    setRoutes(formatRouter(dataListCate.data));
  }, []);

  React.useLayoutEffect(() => {
    dispatch({ type: actions.GET_ALL_AUTHOR, body: routes[index]._id });
  }, [index]);

  const rednderTabBar = props => {
    return (
      <>
        {!dataListCate.isLoading && (
          <TabBar
            {...props}
            scrollEnabled={true}
            renderLabel={_renderLabel}
            tabStyle={styles.tabStyle}
            indicatorStyle={styles.tabBarIndicatorStyle}
            style={{ backgroundColor: themeNew.colors.background }}
          />
        )}
      </>
    );
  };
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'cate01':
        return index === 0 ? <TabSceneReadingStatus route={route} /> : null;
      case 'cate02':
        return index === 1 ? <TapScreenFavoriteBook route={route} /> : null;
      case 'cate03':
        return index === 2 ? <TapScenceAuthor /> : null;
      default:
        return <TabSceneReadingStatus />;
    }
  };
  return (
    <TabView
      lazy
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={rednderTabBar}
      onIndexChange={setIndex}
      style={{ height: 500 }}
    />
  );
};

export default TapReadingStatus;

const styles = StyleSheet.create({
  tabBarIndicatorStyle: {
    height: 2,
    backgroundColor: theme.colors.creamRed

  },
  tabStyle: {
    width: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
