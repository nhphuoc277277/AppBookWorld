import {
    StyleSheet,
    View,
    Dimensions,
    FlatList,
    Animated,
    Pressable,
    ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import ItemWelcome from './components/ItemWelcome';
import { data } from './components/data';
import { Block, Container, Text } from '@components';
import { routes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';

import Paginator from './components/Paginator';
import { useAppSelector } from '@hooks';
import { colors, useTheme } from 'themeNew';

const { width, heigth } = Dimensions.get('window');
const Welcome = () => {
    const navigation = useNavigation();
    const scrollX = useRef(new Animated.Value(0)).current;
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const theme = useTheme(themeStore);
    // const slidesRef = useRef(null);
    let position = Animated.divide(scrollX, width);
    if (data && data.length) {
        return (
            <Container
                style={{ backgroundColor: theme.colors.background, flex: 1 }}
                statusColor={theme.colors.background}>
                <View style={styles.Container}>
                    <FlatList
                        data={data}
                        keyExtractor={item => item.id}
                        horizontal
                        pagingEnabled
                        scrollEnabled
                        snapToAlignment="center"
                        scrollEventThrottle={16}
                        decelerationRate={'fast'}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => <ItemWelcome item={item} />}
                        onScroll={Animated.event(
                            [
                                {
                                    nativeEvent: {
                                        contentOffset: { x: scrollX },
                                    },
                                },
                            ],
                            {
                                useNativeDriver: false,
                            },
                        )}
                    />
                    <View style={styles.dot}>
                        <Paginator scrollX={scrollX} data={data} />
                    </View>
                    <Block style={styles.allButtom}>
                        <Pressable
                            style={styles.buttomDangNhap}
                            onPress={() =>
                                navigation.navigate(routes.LOGIN_SCREEN)
                            }>
                            <Text fontType="bold1" style={styles.textDangNhap}>
                                Đăng nhập
                            </Text>
                        </Pressable>
                        <Pressable style={styles.buttomDangKy}>
                            <Text
                                style={styles.textDangKy}
                                fontType="bold1"
                                onPress={() =>
                                    navigation.navigate(routes.REGISTER_SCREEN)
                                }>
                                Đăng ký
                            </Text>
                        </Pressable>
                    </Block>
                </View>
            </Container>
        );
    }
    return null;
};

export default Welcome;

const styles = StyleSheet.create({
    dot: {
        position: 'absolute',
        marginTop: width / 0.87,
        marginLeft: '35%',
    },
    textDangKy: {
        color: 'black',
        fontSize: 18,
        lineHeight: 28,
    },
    textDangNhap: {
        color: 'white',
        fontSize: 18,
        lineHeight: 28,
    },
    buttomDangKy: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%',
        height: 55,
        backgroundColor: '#F3F3F3',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    allButtom: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttomDangNhap: {
        backgroundColor: colors.light.primary,
        width: '48%',
        marginBottom: '20%',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    textGioiThieu: {
        marginTop: 15,
        paddingHorizontal: 20,
        fontSize: 17,
        lineHeight: 21,
        fontWeight: '400',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#9D9D9D',
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 77,
    },
    textWelcom: {
        fontSize: 24,
        lineHeight: 30,
        fontWeight: 'bold',
        color: '#19191B',
    },
    Container: {
        position: 'relative',
        height: '100%',
        paddingTop: 40,
    },
    dotView: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
