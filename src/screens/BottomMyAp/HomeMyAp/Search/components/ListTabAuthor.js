import { Block, Icon, Text } from '@components';
import { useAppDispatch, useAppSelector, useDebounce } from '@hooks';
import { routes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/core';
import { deleteSearch } from '@redux/reducerNew';
import React, { useEffect, useState } from 'react';
import { withNamespaces } from 'react-i18next';
import {
    FlatList,
    Image,
    Pressable,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { makeStyles, useTheme } from 'themeNew';

const ListTabAuthor = ({ search, setSearch, t }) => {
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const allAuthors = useAppSelector(state => state.root.author.authors);
    const historySearch = useAppSelector(state => state.root.search.searchList);
    const { colors } = useTheme(themeStore);
    const styles = useStyle(themeStore);
    const [listSearch, setListSearch] = useState([]);
    const navigation = useNavigation();
    const dispatch = useAppDispatch();

    const searchDebounce = useDebounce(search, 400);

    useEffect(() => {
        if (searchDebounce) {
            setListSearch(
                allAuthors
                    .filter(item => item.name.search(searchDebounce) !== -1)
                    .slice(0, 3),
            );
        } else {
            setListSearch([]);
        }
    }, [searchDebounce]);

    const ItemHistory = ({ title, index }) => {
        return (
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
        );
    };

    const ItemAuthor = item => {
        return (
            <Block height={70} row alignCenter marginHorizontal={20}>
                <FastImage
                    style={styles.imageStyle}
                    source={{
                        uri: item?.avatar,
                        priority: FastImage.priority.high,
                    }}
                />
                <Block flexShrink={1} marginLeft={10} paddingTop={10}>
                    <Text fontType="bold" color={colors.textInBox}>
                        {item?.name}
                    </Text>
                    <Text numberOfLines={2} color={colors.textInBox}>
                        {item?.aboutAuthor?.details}
                    </Text>
                </Block>
                <Pressable
                    onPress={() =>
                        navigation.navigate(routes.DETAIL_AUTHOR_MY_AP, {
                            item,
                        })
                    }>
                    <Block
                        marginLeft={10}
                        backgroundColor={colors.primary}
                        radius={5}
                        paddingHorizontal={10}
                        paddingVertical={5}>
                        <Text color={colors.white}>{t('detail')}</Text>
                    </Block>
                </Pressable>
            </Block>
        );
    };

    const SectionHeader = title => (
        <View
            style={[
                styles.containerSection,
                { backgroundColor: colors.backgroundDark2 },
            ]}>
            <Text fontType="medium1" style={styles.headerSection}>
                {title}
            </Text>
        </View>
    );

    return (
        <ScrollView style={{ paddingVertical: 30 }}>
            {listSearch &&
                listSearch?.slice(0, 3).map(item => ItemAuthor(item))}

            {listSearch.length > 0 && (
                <Text
                    color={colors.primary}
                    fontType="bold"
                    marginLeft={20}
                    marginBottom={10}>
                    View all {allAuthors.length - 4} books
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
        </ScrollView>
    );
};

export default withNamespaces()(ListTabAuthor);

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
        backgroundColor: colors.grey15,
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
