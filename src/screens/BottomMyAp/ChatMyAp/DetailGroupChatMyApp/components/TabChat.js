import {StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Block, Text} from '@components';
import {TabBar, TabView} from 'react-native-tab-view';
import {theme} from '@theme';
import ListMyGroup from './ListMyGroup';
import ListCommunity from './ListCommunity';

const _renderLabel = ({route, focused, color}) => {
  return (
    <Block>
      <Text
        size={16}
        marginHorizontal={45}
        color={focused ? theme.colors.red : theme.colors.lightGray}>
        {route.title}
      </Text>
    </Block>
  );
};

const TabChat = () => {
  const [routes, setRoutes] = useState([{key: 'Default', title: 'Default'}]);
  const [index, setIndex] = useState(0);

  const dataListChat = {
    data: [
      {
        _id: 'chat01',
        name: 'Của tôi',
      },
      {
        _id: 'chat02',
        name: 'Cộng đồng',
      },
    ],
    isLoading: false,
  };
  const formatRouter = data => {
    return data?.map(item => {
      return {
        key: item._id,
        title: item.name,
      };
    });
  };
  useEffect(() => {
    setRoutes(formatRouter(dataListChat.data));
  }, []);

  const renderTabBar = props => {
    return (
      <>
        {!dataListChat.isLoading && (
          <TabBar
            {...props}
            indicatorStyle={styles.indicatorStyle}
            renderLabel={_renderLabel}
            tabStyle={styles.tabStyle}
            pressColor={theme.colors.white}
            scrollEnabled={true}
            labelStyle={{color: 'red'}}
            style={{
              backgroundColor: theme.colors.white,
            }}
          />
        )}
      </>
    );
  };
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'chat01':
        return index === 0 ? <ListMyGroup /> : null;
      case 'chat02':
        return index === 1 ? <ListCommunity /> : null;
      default:
        return <ListMyGroup />;
    }
  };
  const height =
    dataListChat?.myGroup?.length > 0
      ? (dataListChat?.myGroup?.length + 1) * 140
      : 20;

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      style={{height: height}}
    />
  );
};

export default TabChat;

const styles = StyleSheet.create({
  indicatorStyle: {
    backgroundColor: theme.colors.dark,
    color: theme.colors.black,
  },
  tabStyle: {width: 'auto'},
});
