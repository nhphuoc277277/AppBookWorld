import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import React from 'react';
import { Block, Text } from '@components';
import { makeStyles, useTheme } from 'themeNew';
import { withNamespaces } from 'react-i18next';
import { useAppSelector } from '@hooks';
import { useNavigation } from '@react-navigation/native';
import { theme } from '@theme';
import { formatDay } from '@utils/helper';

const ItemNoti = ({ item }) => {
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const themeNew = useTheme(themeStore);
    return (
        <TouchableOpacity>
            <Block
                width="100%"
                row
                paddingHorizontal={20}
                marginTop={20}
            >
                <Block
                    width={65}
                    height={65}
                    radius={50}
                    justifyCenter
                    alignCenter
                    padding={7}
                    borderWidth={3}
                    borderColor={theme.colors.creamRed}>
                    <Image style={styles.avatar} source={{ uri: item.book.image }} />
                </Block>
                <Block width={270}>
                    <Text fontType='bold1' color={themeNew.colors.textInBox} style={styles.content} lineBreakMode='2'>{item.content}</Text>
                    <Text fontType='regular1' color={themeNew.colors.textInBox} style={styles.time}>{formatDay(new Date(item.createdAt))}</Text>
                </Block>
            </Block>
        </TouchableOpacity>
    )
}

export default ItemNoti;

const styles = StyleSheet.create({
    time: {
        fontSize: 12,
        marginLeft: 12,
    },
    content: {
        fontSize: 14,
        marginBottom: 10,
        marginLeft: 12,
    },
    avatar: {
        width: 55,
        height: 55,
        borderRadius: 40,
        margin: 5,
        resizeMode: 'center'
    },
});