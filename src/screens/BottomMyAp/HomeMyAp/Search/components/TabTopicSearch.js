import { Block, Text } from '@components';
import React, { useState, useEffect, useCallback } from 'react';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import ListTabBook from './ListTabBook';
import { useAppSelector } from 'hooks';
import { colors, makeStyles, useTheme } from 'themeNew';
import ListTabAuthor from './ListTabAuthor';

const TabTopicSearch = ({ search, setSearch }) => {
    const [routes] = useState([
        { key: 'BookTab', title: 'Book' },
        { key: 'AuthorTab', title: 'Author' },
        // { key: 'Group', title: 'Group' },
    ]);
    const [index, setIndex] = useState(0);

    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const theme = useTheme(themeStore);
    const styles = useStyle(themeStore);

    const _renderLabel = useCallback(
        ({ route, focused, color }) => {
            return (
                <Block borderBottomColor="red">
                    <Text
                        color={
                            focused ? theme.colors.primary : theme.colors.grey10
                        }
                        fontType="bold1">
                        {route?.title}
                    </Text>
                </Block>
            );
        },
        [theme.colors.grey10, theme.colors.primary],
    );

    const renderTabBar = useCallback(
        props => {
            return (
                <>
                    <TabBar
                        {...props}
                        indicatorStyle={styles.indicatorStyle}
                        renderLabel={_renderLabel}
                        tabStyle={styles.tabStyle}
                        pressColor={theme.colors.white}
                        scrollEnabled={true}
                        style={{
                            backgroundColor: theme.colors.background,
                        }}
                        // inactiveColor='yellow'
                    />
                </>
            );
        },
        [
            _renderLabel,
            styles.indicatorStyle,
            styles.tabStyle,
            theme.colors.text,
            theme.colors.white,
        ],
    );

    const renderScene = SceneMap({
        BookTab: () => <ListTabBook search={search} setSearch={setSearch} />,
        AuthorTab: () => (
            <ListTabAuthor search={search} setSearch={setSearch} />
        ),
    });

    return (
        <TabView
            lazy
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
        />
    );
};

export default TabTopicSearch;

const useStyle = makeStyles()(({ colors }) => ({
    indicatorStyle: {
        backgroundColor: colors.primary,
        height: 2,
        borderRadius: 5,
        bottom: -1.5,
        zIndex: 10000,
    },
    tabStyle: {
        width: 80,
    },
}));
