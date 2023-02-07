import { StyleSheet, Dimensions } from 'react-native';
import { Block, Text, Button } from '@components';
import React from 'react';
import { theme } from '@theme';
import Icon from '@components/Icon';
import { useNavigation } from '@react-navigation/native';
import { routes } from '@navigation/routes';
import { useAppSelector } from 'hooks';
import { makeStyles, useTheme } from 'themeNew';
import { withNamespaces } from 'react-i18next';
const _renderStar = num => {
    let star = [];
    for (let i = 0; i < num; i++) {
        star.push(
            <Icon
                component={'AntDesign'}
                name="star"
                color={theme.colors.yellow}
                size={25}
            />,
        );
    }
    return star;
};

const IntroduceText = ({ item, t }) => {
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const theme = useTheme(themeStore);
    return (
        <Block marginHorizontal={10} marginTop={20}>
            {/* Giới thiệu tác giả */}
            <Text
                marginTop={20}
                color={theme.colors.textInBox}
                fontType={'bold1'}
                size={20}>
                {t('introduceText')}
            </Text>
            <Text
                fontType={'regular1'}
                color={theme.colors.textInBox}
                size={15}>
                {item?.item?.introduction}
            </Text>
            {/* Tổng quan đánh giá */}
            <Text
                marginTop={10}
                fontType={'bold1'}
                color={theme.colors.textInBox}
                size={20}>
                {t('overview')}
            </Text>
            <Text
                fontType={'regular1'}
                color={theme.colors.textInBox}
                size={15}>
                {item?.item?.overview}
            </Text>
        </Block>
    );
};

const styles = StyleSheet.create({
    start: {
        height: 35,
        width: 35,
    },
    btn_star: {
        marginLeft: 5,
    },
    tip_comment: {
        backgroundColor: theme.colors.gray4,
        borderRadius: 10,
        paddingHorizontal: 15,
        height: 160,
        fontSize: 16,
        paddingVertical: 15,
        marginTop: 20,
    },
    btn_submit_comment: {
        backgroundColor: theme.colors.dark1,
        borderRadius: 10,
        width: '70%',
        paddingVertical: 10,
        alignItems: 'center',
    },
    btnItemCate: {
        borderRadius: 12,
        paddingHorizontal: 20,
        width: 160,
        height: 45,
        justifyContent: 'center',
        alignContent: 'center',
    },
});

export default withNamespaces()(IntroduceText);
