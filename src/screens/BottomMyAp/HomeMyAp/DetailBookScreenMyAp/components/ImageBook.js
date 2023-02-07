import { Block, Text } from '@components';
import Icon from '@components/Icon';
import { useAppSelector } from '@hooks';
import { theme } from '@theme';
import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'themeNew';
const widthPhone = Dimensions.get('window').width;

const ImageBook = ({ item, route }) => {
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const themeNew = useTheme(themeStore);
    const _renderStar = () => {
        let star = [];
        for (let i = 0; i < item.star; i++) {
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
    };

    return (
        <Block alignCenter>
            <FastImage
                style={styles.image}
                source={{
                    uri: item.item.image,
                    priority: FastImage.priority.high,
                }}
            />
            <Text
                fontType="bold1"
                size={20}
                marginTop={10}
                color={themeNew.colors.textInBox}>
                {item.item.name}
            </Text>
            <Text
                fontType="regular1"
                size={16}
                color={themeNew.colors.textInBox}>
                {item.item.name}
            </Text>
            {/* Star */}
            <Block row marginTop={5}>
                {_renderStar()}
                <Text marginLeft={5}>{item.star}.0</Text>
            </Block>
        </Block>
    );
};

export default ImageBook;

const styles = StyleSheet.create({
    image: {
        height: 330,
        width: widthPhone - 150,
        resizeMode: 'center',
        borderRadius: 20,
    },
});
