import { Text } from '@components';
import { useAppSelector } from '@hooks';
import { routes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { withNamespaces } from 'react-i18next';
import { Image, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { makeStyles, useTheme } from 'themeNew';

const ItemAuthor = ({ item, t }) => {
    const navigation = useNavigation();
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const theme = useTheme(themeStore);
    const styles = useStyles(themeStore);

    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate(routes.DETAIL_AUTHOR_MY_AP, {
                    bookmark: true,
                    item,
                })
            }
            style={{
                marginHorizontal: 10,
                marginTop: 10,
                alignItems: 'center',
            }}>
            <FastImage
                style={styles.image}
                source={{
                    uri: item.avatar || '',
                    priority: FastImage.priority.normal,
                }}
            />
            <Text color={theme.colors.textInBox} size={12} marginTop={5}>
                {item?.name.slice(0, 12)}
            </Text>
        </TouchableOpacity>
    );
};

export default withNamespaces()(ItemAuthor);

const useStyles = makeStyles()(({ colors }) => ({
    image: {
        height: 55,
        width: 55,
        borderRadius: 100,
    },
}));
