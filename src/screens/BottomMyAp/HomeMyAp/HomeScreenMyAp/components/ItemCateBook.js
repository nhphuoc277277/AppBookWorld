import { Block, Text, Button } from '@components';
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from '@components/Icon';
import { routes } from '@navigation/routes';
import { withNamespaces } from 'react-i18next';
import { useAppSelector } from '@hooks';
import { useTheme, makeStyles } from 'themeNew';
import FastImage from 'react-native-fast-image';

const { width, height } = Dimensions.get('window');

const PADDING_ITEM = 15;

const ItemCateBook = ({ item, t }) => {
    const navigation = useNavigation();
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const theme = useTheme(themeStore);
    const styles = useStyles(themeStore);
    let star = [];
    const allBooks = useAppSelector(state => state.root.book.bookList);
    const _renderStar = () => {
        for (let i = 0; i <= allBooks.length; i++) {
            let num = Math.floor(Math.random() * 3) + 3;
            // let star = [];
            for (let j = 1; j <= num; j++) {
                star.push(
                    <Icon
                        component={'AntDesign'}
                        name="star"
                        color={theme.colors.yellow}
                        size={20}
                    />,
                );
            }
            return star;
        }
    };

    const _renderView = () => {
        for (let i = 0; i <= allBooks.length; i++) {
            let num = Math.floor(Math.random() * 9999) + 100;
            return num;
        }
    };
    const _renderDownload = () => {
        for (let i = 0; i <= allBooks.length; i++) {
            let num = Math.floor(Math.random() * 999) + 100;
            return num;
        }
    };

    return (
        <Block paddingHorizontal={10} marginTop={15} row>
            <Block>
                <FastImage
                    style={styles.image}
                    source={{
                        uri: item.image || '',
                        priority: FastImage.priority.normal,
                    }}
                />
            </Block>
            <Block justifyContent={'space-between'} marginLeft={15}>
                <Block width={280}>
                    <Text
                        size={17}
                        width="75%"
                        fontType="bold1"
                        numberOfLines={2}
                        color={theme.colors.textInBox}>
                        {item.name}
                    </Text>
                </Block>
                <Block marginTop={30} row>
                    <Icon
                        component={'Foundation'}
                        name="page-multiple"
                        color={theme.colors.textInBox}
                        size={16}
                    />
                    <Text
                        marginLeft={5}
                        marginRight={20}
                        size={14}
                        fontType="regular1"
                        color={theme.colors.textInBox}>
                        {_renderDownload()}
                    </Text>

                    <Icon
                        component={'Entypo'}
                        name="eye"
                        color={theme.colors.textInBox}
                        size={16}
                    />
                    <Text
                        marginLeft={5}
                        marginRight={20}
                        size={14}
                        fontType="regular1"
                        color={theme.colors.textInBox}>
                        {_renderView()} view
                    </Text>
                </Block>
                <Block row alignCenter>
                    {_renderStar()}
                    <Text color={theme.colors.textInBox} marginLeft={5}>
                        {star.length}.0
                    </Text>
                </Block>
                <Block row>
                    <Button
                        style={[
                            styles.btnItemCate,
                            { backgroundColor: theme.colors.primary },
                        ]}
                        onPress={() =>
                            navigation.navigate(routes.DETAIL_BOOK_MY_AP, {
                                item,
                                star: star.length,
                            })
                        }>
                        <Text size={12} fontType="bold" color="white">
                            {t('readBook')}
                        </Text>
                    </Button>
                    <Button
                        onPress={() =>
                            navigation.navigate(routes.DETAIL_BOOK_MY_AP, {
                                item,
                                _isRead: false,
                                star: star.length,
                            })
                        }
                        style={[
                            styles.btnItemCate,
                            {
                                backgroundColor: theme.colors.black,
                                marginLeft: 10,
                            },
                        ]}>
                        <Text size={12} fontType="bold" color="white">
                            {t('listenBook')}
                        </Text>
                    </Button>
                </Block>
            </Block>
        </Block>
    );
};

export default withNamespaces()(ItemCateBook);

const useStyles = makeStyles()(({ colors }) => ({
    container: {
        // marginTop: '16%',
    },
    inputSection: {
        color: colors.white,
        height: 40,
        marginHorizontal: 30,
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
    },
    inputText: {
        flex: 1,
        paddingRight: 10,
    },
    iconSearch: {
        paddingHorizontal: 10,
    },
    mainView: {
        backgroundColor: colors.white,
        flex: 1,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingTop: 15,
        paddingHorizontal: 15,
    },
    titleSection: {
        fontSize: 18,
        color: colors.blueTitle,
        fontWeight: 'bold',
    },
    titleViewAll: {
        color: colors.orange,
    },
    image: {
        height: 170,
        width: width / 3.5,
        borderRadius: 15,
        resizeMode: 'center',
    },
    title_InView: {
        paddingTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.blueTitle,
    },
    containerBtnDetail: {
        backgroundColor: colors.orange,
        height: 35,
    },
    btnDetail: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageEventHightLight: {
        height: 68,
        width: 68,
    },
    titleEventhighlight: {
        color: colors.blueTitle,
        fontWeight: 'bold',
        fontSize: 16,
    },
    btnItemCate: {
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
}));
