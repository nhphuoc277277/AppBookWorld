import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Block, Text } from '@components';
import { theme } from '@theme';
import Icon from '@components/Icon';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { routes } from '@navigation/routes';
import { makeStyles, useTheme } from 'themeNew';
import { withNamespaces } from 'react-i18next';
import { useAppSelector } from '@hooks';
import FastImage from 'react-native-fast-image';

const ItemAuthor = ({ item, t }) => {
    const navigation = useNavigation();
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const theme = useTheme(themeStore);
    const styles = useStyle(themeStore);
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

        let num = Math.floor(Math.random() * 999) + 100;
        return num;

    };

    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate(routes.DETAIL_AUTHOR_MY_AP, {
                    bookmark: true,
                    item,
                })
            }>
            <Block
                width="100%"
                height={200}
                alignCenter
                marginTop={20}
                relative>
                <Block
                    width="100%"
                    height={145}
                    backgroundColor={theme.colors.text}
                    radius={20}
                    absolute
                    row
                    top={50}>
                    <Block width="50%" height="100%">
                        <Text
                            fontType="bold1"
                            color={theme.colors.textInBox}
                            style={styles.textName}>
                            {t('textNameAuthor')}
                        </Text>
                        <Text
                            fontType="bold1"
                            color={theme.colors.textInBox}
                            style={styles.nameAuthor}
                            numberOfLines={1}>
                            {item.name}
                        </Text>
                        <Text
                            fontType="bold1"
                            color={theme.colors.textInBox}
                            style={styles.textRate}>
                            {t('textRating')}
                        </Text>
                        <Block row marginLeft={22} marginTop={5}>
                            {_renderStar()}
                            <Text
                                fontType="bold1"
                                color={theme.colors.textInBox}
                                style={styles.totalRate}>
                                {star.length}.0
                            </Text>
                        </Block>
                    </Block>
                    <Block width="50%" height="100%" alignCenter>
                        <Text
                            fontType="bold1"
                            color={theme.colors.textInBox}
                            numberOfLines={2}
                            style={styles.textQuantity}>
                            {t('texQuantity')}
                        </Text>
                        <Text
                            fontType="medium1"
                            color={theme.colors.textInBox}
                            style={styles.totalRead}>
                            {_renderView()}
                        </Text>
                        <Text
                            fontType="bold1"
                            color={theme.colors.textInBox}
                            style={styles.textName}>
                            {t('textToltalRead')}
                        </Text>
                        <Text
                            fontType="medium1"
                            color={theme.colors.textInBox}
                            style={styles.totalRead}>
                            {_renderView()}
                        </Text>
                    </Block>
                </Block>
                <Block
                    justifyCenter
                    alignCenter
                    padding={7}
                    radius={100}
                    width={90}
                    height={90}
                    backgroundColor={theme.colors.background}>
                    <Block
                        backgroundColor={theme.colors.white}
                        radius={50}
                        width={80}
                        height={80}
                        justifyCenter
                        alignCenter
                        padding={7}
                        borderWidth={3}
                        borderColor={theme.colors.grey9}>
                        <FastImage
                            style={styles.avatar}
                            source={{
                                uri: item.avatar,
                                priority: FastImage.priority.high,
                            }}
                        />
                    </Block>
                </Block>
            </Block>
        </TouchableOpacity>
    );
};

export default withNamespaces()(ItemAuthor);

const useStyle = makeStyles()(({ normalize, colors }) => ({
    totalRead: {
        fontSize: 16,
        marginTop: 3,
        marginLeft: '15%',
        lineHeight: 21,
    },
    textQuantity: {
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 18,
        textAlign: 'center',
        marginTop: '8%',
        marginLeft: '20%',
        width: 122,
    },
    totalRate: {
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 21,
        marginLeft: 3.21,
    },
    textRate: {
        marginTop: '10%',
        marginLeft: '12%',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 15,
    },
    nameAuthor: {
        width: '55%',
        marginTop: '5%',
        marginLeft: '12%',
        fontWeight: '600',
        fontSize: 15,
        lineHeight: 21,
    },
    textName: {
        marginTop: '10%',
        marginLeft: '12%',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 15,
    },
    avatar: {
        width: 67,
        height: 67,
        borderRadius: 50,
        margin: 7,
    },
    Container: {
        shadowColor: theme.colors.black,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 6,
    },
}));
