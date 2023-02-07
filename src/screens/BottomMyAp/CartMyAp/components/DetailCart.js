import {
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    Pressable,
    ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { Block, Text, HeaderWithButton, Container } from '@components';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useNavigation } from '@react-navigation/native';
import { routes } from '@navigation/routes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '@theme';
import { colors, useTheme } from 'themeNew';
import { withNamespaces } from 'react-i18next';
const DetailCart = ({ route, t }) => {
    const navigation = useNavigation();
    const bookStore = useAppSelector(state => state.root.cart.cartList);
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const themeNew = useTheme(themeStore);
    let price = route.params.allPrice;
    let allPrice = price - price * 0.1;
    return (
        <Container
            statusColor={themeNew.colors.background}
            edges={['left', 'right']}
            style={{ backgroundColor: themeNew.colors.background, flex: 1 }}>
            <HeaderWithButton isBackHeader title={t('pay')} />
            <ScrollView style={styles.scroll}>
                {bookStore.map(item => {
                    let sum = 0;
                    const priceBook = () => {
                        for (const i in item.chapter) {
                            sum += item.chapter[i].price;
                        }
                        return sum;
                    };
                    if (item.status === true) {
                        return (
                            <Block
                                marginTop={10}
                                row
                                style={[
                                    styles.Item,
                                    { backgroundColor: themeNew.colors.text },
                                ]}>
                                <Block
                                    backgroundColor={themeNew.colors.text}
                                    padding={7}
                                    style={styles.backgroundImage}>
                                    <Image
                                        style={styles.image}
                                        source={{ uri: item.image }}
                                    />
                                </Block>
                                <Block marginLeft={15} column>
                                    <Block row>
                                        <Text
                                            fontType="bold1"
                                            style={styles.textName}
                                            numberOfLines={2}
                                            color={themeNew.colors.textInBox}>
                                            {item.name}
                                        </Text>
                                    </Block>
                                    <Text
                                        style={styles.quantity}
                                        color={themeNew.colors.textInBox}>
                                        {t('numberOfEpisodes')}:{' '}
                                        {Object.keys(item.chapter).length}
                                    </Text>
                                    <Text
                                        color={themeNew.colors.textInBox}
                                        fontType="medium1"
                                        style={styles.textPrice}>
                                        {priceBook()
                                            .toFixed(0)
                                            .replace(
                                                /(\d)(?=(\d{3})+(?!\d))/g,
                                                '$1.',
                                            )}{' '}
                                        đ
                                    </Text>
                                </Block>
                            </Block>
                        );
                    }
                })}

                <Block marginHorizontal={8} marginBottom={10}>
                    <Block
                        row
                        width={'100%'}
                        height={45}
                        paddingHorizontal={10}
                        backgroundColor={themeNew.colors.background}
                        marginTop={10}>
                        <Image
                            marginTop={10}
                            source={require('../../../../assets/icons/note.png')}
                        />
                        <Text
                            fontType="medium1"
                            color={themeNew.colors.textInBox}
                            marginLeft={10}
                            lineHeight={20}>
                            {t('askPay')}
                        </Text>
                    </Block>
                </Block>
                <Block
                    radius={10}
                    backgroundColor={themeNew.colors.text}
                    marginHorizontal={20}>
                    <Block marginBottom={20} />
                    <Block row style={styles.AllPriceBook}>
                        <Text color={themeNew.colors.textInBox} fontType="regular1" size={15}>
                            {t('totalPrice')}
                        </Text>
                        <Text color={themeNew.colors.textInBox} fontType="regular1" style={styles.textPrice}>
                            {price
                                .toFixed(0)
                                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}{' '}
                            đ
                        </Text>
                    </Block>
                    <Block row style={styles.AllPriceBook}>
                        <Text color={themeNew.colors.textInBox} fontType="regular1" size={15}>
                            {t('discount')}
                        </Text>
                        <Text color={themeNew.colors.textInBox} fontType="regular1" style={styles.textPrice}>
                            {(price * 0.1)
                                .toFixed(0)
                                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}{' '}
                            đ
                        </Text>
                    </Block>
                    <Block
                        backgroundColor={themeNew.colors.grey10}
                        style={styles.scratch}
                    />
                    <Block row style={styles.AllPriceBook} paddingRight={25}>
                        <Text
                            fontType="bold1"
                            size={15}
                            style={styles.textName}
                            color={theme.colors.lightRed}>
                            {t('toTal')}
                        </Text>
                        <Text
                            fontType="bold1"
                            style={styles.textPrice}
                            color={theme.colors.lightRed}>
                            {(price - price * 0.1)
                                .toFixed(0)
                                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}{' '}
                            đ
                        </Text>
                    </Block>
                </Block>
            </ScrollView>
            <Block style={styles.Pay} marginBottom={5}>
                <TouchableOpacity
                    style={styles.Bottom}
                    onPress={() =>
                        navigation.navigate(routes.PAYMENT_METHODS, {
                            allPrice: allPrice,
                        })
                    }>
                    <Text fontType="bold1" style={styles.textBottom}>
                        {t('pay')}
                    </Text>
                </TouchableOpacity>
            </Block>
        </Container>
    );
};

export default withNamespaces()(DetailCart);

const styles = StyleSheet.create({
    backgroundImage: {
        borderRadius: 10,
    },
    AllPriceBook: {
        justifyContent: 'space-between',
        marginHorizontal: 25,
        marginBottom: 20,
    },
    scratch: {
        width: '80%',
        height: 1,
        marginLeft: '10%',
        marginBottom: 20,
    },
    quantity: {
        marginTop: 10,
    },
    textPrice: {
        marginTop: 5,
        fontSize: 18,
    },
    image: {
        width: 80,
        height: 95,
        borderRadius: 10,
    },
    Item: {
        alignItems: 'center',
        marginHorizontal: 20,
        paddingHorizontal: 15,
        marginVertical: 10,
        width: '89%',
        height: 130,
        borderRadius: 10,
        shadowColor: theme.colors.gray2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 11.14,

        elevation: 17,
    },
    textName: {
        width: '85%',
        fontSize: 20,
    },
    Pay: {
        alignItems: 'center',
        paddingRight: 5,
        height: 61,
        justifyContent: 'center',
    },
    scroll: {
        height: '66.7%',
    },
    textBottom: {
        color: 'white',
        fontSize: 18,
    },
    Bottom: {
        height: 50,
        width: '90%',
        backgroundColor: theme.colors.lightRed,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    Name: {
        fontWeight: '700',
        lineHeight: 30,
    },
    Price: {
        marginTop: 30,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#D45555',
    },
    Container: {
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
});
