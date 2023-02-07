import { Block, Text } from '@components';
import React, { useState, useEffect, useCallback } from 'react';
import { TabBar, TabView } from 'react-native-tab-view';
import TabSceneCategoryBook from './TabSceneCategoryBook';
import { useAppSelector } from 'hooks';
import { useGetAllBookByCategoryQuery } from '@redux/servicesNew';
import { colors, makeStyles, useTheme } from 'themeNew';
import { strings } from 'I18n';

const TabCategoryBook = () => {
    const [routes, setRoutes] = useState([
        { key: 'Default', title: 'Default' },
    ]);
    const [index, setIndex] = useState(0);

    const allCategories = useAppSelector(state => state.root.book.categoryList);
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const theme = useTheme(themeStore);
    const styles = useStyle(themeStore);
    const myInfo = useAppSelector(state => state.root.auth);

    useEffect(() => {
        if (routes.length === 1) {
            setRoutes(formatRouter(allCategories));
        }
    }, [allCategories, routes]);

    //Cập nhật mỗi lần thay đổi TabView
    useGetAllBookByCategoryQuery({
        token: myInfo.token,
        params: routes[index]?._id,
    });

    const formatRouter = data => {
        return data?.map(item => {
            return {
                key: item._id,
                title: item.name,
                ...item,
            };
        });
    };

    const _renderLabel = useCallback(
        ({ route, focused, color }) => {
            return (
                <Block borderBottomColor="red">
                    <Text
                        color={
                            focused ? theme.colors.primary : theme.colors.grey10
                        }
                        fontType="bold">
                        {/* {route.title} */}
                        {route.key !== 'Default'
                            ? strings(`categories.${route.code}`)
                            : ''}
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
                    {allCategories && (
                        <TabBar
                            {...props}
                            indicatorStyle={styles.indicatorStyle}
                            renderLabel={_renderLabel}
                            tabStyle={styles.tabStyle}
                            pressColor={theme.colors.white}
                            scrollEnabled={true}
                            style={{
                                backgroundColor: theme.colors.text,
                                shadowColor: theme.colors.text,
                            }}
                            inactiveColor="yellow"
                        />
                    )}
                </>
            );
        },
        [
            _renderLabel,
            allCategories,
            styles.indicatorStyle,
            styles.tabStyle,
            theme.colors.text,
            theme.colors.white,
        ],
    );

    return (
        <TabView
            lazy
            navigationState={{ index, routes }}
            renderScene={({ route }) => {
                return <TabSceneCategoryBook route={route} />;
            }}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
        />
    );
};

export default TabCategoryBook;

const useStyle = makeStyles()(({ colors }) => ({
    indicatorStyle: {
        backgroundColor: colors.primary,
        height: 4,
        borderRadius: 5,
        bottom: -1.5,
        zIndex: 10000,
    },
    tabStyle: {
        width: 'auto',
        // borderBottomColor: colors.grey12,
        // borderBottomWidth: 1
    },
}));
