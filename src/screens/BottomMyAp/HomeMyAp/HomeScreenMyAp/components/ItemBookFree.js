import { useAppSelector } from '@hooks';
import { routes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { isEmpty } from 'lodash';
import React from 'react';
import { withNamespaces } from 'react-i18next';
import { Image, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { makeStyles } from 'themeNew';

const ItemBookFree = ({ item, t }) => {
    const navigation = useNavigation();
    const themeStore = useAppSelector(state => state.root.themeApp.theme);

    const styles = useStyles(themeStore);

    return (
        <TouchableOpacity
            style={{ marginHorizontal: 20, marginTop: 10 }}
            onPress={() =>
                navigation.navigate(routes.DETAIL_BOOK_MY_AP, {
                    bookmark: true,
                    item,
                })
            }>
            {!isEmpty(item.image) ? (
                <FastImage
                    style={styles.image}
                    source={{
                        uri: item.image,
                        priority: FastImage.priority.normal,
                    }}
                />
            ) : null}
        </TouchableOpacity>
    );
};

export default withNamespaces()(ItemBookFree);

const useStyles = makeStyles()(({ colors }) => ({
    image: {
        height: 120,
        width: 80,
        borderRadius: 10,
    },
}));
