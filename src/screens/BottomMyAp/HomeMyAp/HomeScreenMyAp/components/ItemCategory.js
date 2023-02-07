import { Block, Text } from '@components';
import { useAppSelector } from '@hooks';
import { routes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { randomColor } from '@utils/helper';
import { width } from '@utils/responsive';
import React from 'react';
import { withNamespaces } from 'react-i18next';
import { Image, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { makeStyles, useTheme } from 'themeNew';

const ItemCategory = ({ item }) => {
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const { colors } = useTheme(themeStore);
    const styles = useStyle(themeStore);

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() =>
                navigation.navigate(routes.BOOKS_BY_CATEGORY, {
                    id: item.item._id,
                    title: item.item.name,
                })
            }>
            <Block alignCenter justifyCenter>
                {item?.item?.image && (
                    <FastImage
                        style={styles.image}
                        source={{
                            uri: item.item.image || '',
                            priority: FastImage.priority.high,
                        }}
                    />
                )}
                <Text
                    size={12}
                    marginHorizontal={5}
                    marginTop={5}
                    numberOfLines={2}
                    color={colors.textInBox}
                    flexGrow
                    fontType="regular1">
                    {item?.item?.name}
                </Text>
            </Block>
        </TouchableOpacity>
    );
};

const useStyle = makeStyles()(({ colors, normalize }) => ({
    container: {
        marginTop: 10,
        marginBottom: 5,
        marginHorizontal: width * 0.01,
        width: width * 0.22,
        height: normalize(85)('moderate'),
    },
    image: {
        height: normalize(40)('moderate'),
        width: normalize(40)('moderate'),
        marginTop: 5,
    },
}));

export default withNamespaces()(ItemCategory);
