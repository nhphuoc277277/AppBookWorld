import { Block, Text, Button } from '@components';
import React from 'react';
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

const ItemFavoriteBook = ({ item, t }) => {
    const navigation = useNavigation();
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const theme = useTheme(themeStore);

    const styles = useStyles(themeStore);
    return (
        <Block
            style={{ marginHorizontal: 20 }}
            onPress={() =>
                navigation.navigate(routes.DETAIL_BOOK_MY_AP, {
                    bookmark: true,
                    item,
                })
            }>
            <Block width={width} marginRight={PADDING_ITEM} row marginTop={30}>
                <FastImage
                    style={styles.image}
                    source={{
                        uri: item?.idBook?.image || '',
                        priority: FastImage.priority.high,
                    }}
                />
                <Block marginHorizontal={10} flex>
                    <Text
                        size={18}
                        fontType="bold"
                        numberOfLines={2}
                        color={theme.colors.textInBox}>
                        {item?.idBook?.name}
                    </Text>
                    <Text size={14} color={theme.colors.textInBox}>
                        {/* {item.name_author} */}
                    </Text>

                    <Block row marginTop={5} alignCenter>
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
                            color={theme.colors.textInBox}>
                            234
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
                            color={theme.colors.textInBox}>
                            999k
                        </Text>
                    </Block>

                    <Block row marginTop={5} alignCenter>
                        <Icon
                            component={'AntDesign'}
                            name="star"
                            color={theme.colors.yellow}
                            size={16}
                        />
                        <Icon
                            component={'AntDesign'}
                            name="star"
                            color={theme.colors.yellow}
                            size={16}
                        />

                        <Icon
                            component={'AntDesign'}
                            name="star"
                            color={theme.colors.yellow}
                            size={16}
                        />
                        <Icon
                            component={'AntDesign'}
                            name="star"
                            color={theme.colors.yellow}
                            size={16}
                        />
                        <Text marginLeft={5}>4.0</Text>
                    </Block>

                    <Block row marginTop={10} alignCenter>
                        <Button
                            style={[
                                styles.btnItemCate,
                                { backgroundColor: theme.colors.primary },
                            ]}
                            onPress={() =>
                                navigation.navigate(routes.DETAIL_BOOK_MY_AP, {
                                    item,
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
        </Block>
    );
};

export default withNamespaces()(ItemFavoriteBook);

const useStyles = makeStyles()(({ colors }) => ({
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
