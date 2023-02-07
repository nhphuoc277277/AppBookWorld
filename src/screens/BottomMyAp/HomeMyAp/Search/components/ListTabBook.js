import { Block, Icon, Text } from '@components';
import { useAppDispatch, useAppSelector } from '@hooks';
import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import {
    FlatList,
    View,
    Pressable,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { makeStyles, useTheme } from 'themeNew';
import { routes } from '@navigation/routes';
import { withNamespaces } from 'react-i18next';
import { deleteSearch } from '@redux/reducerNew';
import FastImage from 'react-native-fast-image';

const ListTabBook = ({ search, setSearch, t }) => {
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const allBooks = useAppSelector(state => state.root.book.bookList);
    const authors = useAppSelector(state => state.root.author.authors);
    const historySearch = useAppSelector(state => state.root.search.searchList);

    const { colors } = useTheme(themeStore);
    const styles = useStyle(themeStore);
    const [listSearch, setListSearch] = useState([]);
    const navigation = useNavigation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (search) {
            setListSearch(
                allBooks
                    .filter(item => item.name.search(search) !== -1)
                    .slice(0, 3),
            );
        } else {
            setListSearch([]);
        }
    }, [search]);

    // useEffect(() => {
    //     if (search) {
    //         setListSearch(
    //             authors
    //                 .filter(item => item.name.search(search) !== -1)
    //                 .slice(0, 3),
    //         );
    //     } else {
    //         setListSearch([]);
    //     }
    // }, [search]);

    const ItemHistory = useCallback(
        ({ title, index }) => (
            <Pressable
                onPress={() => setSearch(title)}
                style={styles.itemHistory}>
                <Icon
                    component="MaterialIcons"
                    name="history"
                    size={25}
                    color={colors.grey10}
                />
                <Text color={colors.textInBox} style={styles.titleItemHistory}>
                    {title}
                </Text>
                <TouchableOpacity onPress={() => dispatch(deleteSearch(index))}>
                    <Icon
                        component="MaterialIcons"
                        name="clear"
                        size={25}
                        color={colors.grey10}
                    />
                </TouchableOpacity>
            </Pressable>
        ),
        [styles],
    );

    const ItemBook = item => {
        let num = Math.floor(Math.random() * 3) + 3;
        return (
            <Block row alignCenter marginHorizontal={20} marginVertical={10}>
                <FastImage
                    style={styles.imageStyle}
                    source={{
                        uri: item.image,
                        priority: FastImage.priority.high,
                    }}
                />
                <Block flex={1} marginLeft={10} paddingTop={10}>
                    <Text fontType="bold" color={colors.textInBox}>
                        {item.name}
                    </Text>
                    <Text flexGrow={1} color={colors.textInBox}>
                        {item.introduction.slice(0, 100)}
                    </Text>
                </Block>
                <Pressable
                    onPress={() =>
                        navigation.navigate(routes.DETAIL_BOOK_MY_AP, {
                            bookmark: true,
                            item,
                        })
                    }>
                    <Block
                        backgroundColor={colors.primary}
                        radius={5}
                        paddingHorizontal={10}
                        paddingVertical={5}>
                        <Text
                            onPress={() =>
                                navigation.navigate(routes.DETAIL_BOOK_MY_AP, {
                                    bookmark: true,
                                    item,
                                    star: num,
                                })
                            }
                            color={colors.white}>
                            {t('read')}
                        </Text>
                    </Block>
                </Pressable>
            </Block>
        );
    };

    const SectionHeader = title =>
        useCallback(
            <View
                style={[
                    styles.containerSection,
                    { backgroundColor: colors.backgroundDark2 },
                ]}>
                <Text fontType="medium1" style={styles.headerSection}>
                    {title}
                </Text>
            </View>,
            [styles, colors],
        );

    return (
        <Block paddingTop={15}>
            <Block>
                {listSearch &&
                    listSearch?.slice(0, 3).map(item => ItemBook(item))}
            </Block>

            {listSearch.length > 0 && (
                <Text
                    color={colors.primary}
                    fontType="bold"
                    marginLeft={20}
                    marginBottom={10}>
                    View all {allBooks.length - 4} books
                </Text>
            )}
            <FlatList
                ListHeaderComponent={SectionHeader(t('researchHistory'))}
                data={historySearch}
                keyExtractor={item => item._id}
                renderItem={({ item, index }) => (
                    <ItemHistory title={item.value} index={index} />
                )}
            />
        </Block>
    );
};

export default withNamespaces()(ListTabBook);

const useStyle = makeStyles()(({ colors }) => ({
    itemHistory: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: colors.grey14,
        borderBottomWidth: 2,
    },
    titleItemHistory: {
        fontSize: 16,
        marginLeft: 10,
        flexGrow: 1,
    },
    containerSection: {
        height: 60,
        justifyContent: 'center',
    },
    headerSection: {
        fontSize: 16,
        marginLeft: 20,
    },
    imageStyle: {
        height: 50,
        width: 40,
        borderRadius: 5,
    },
}));
