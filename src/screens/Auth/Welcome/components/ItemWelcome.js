import { StyleSheet, Image, useWindowDimensions } from 'react-native';
import React from 'react';
import { Block, Text } from '@components';
import { useAppSelector } from '@hooks';
import { useTheme } from 'themeNew';

// const {width, height} = Dimensions.get('window');

const ItemWelcome = ({ item }) => {
    const { width } = useWindowDimensions();
    const { height } = useWindowDimensions();
    const image = item.url;
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const theme = useTheme(themeStore);

    return (
        <Block
            styles={[
                styles.cardView,
                { backgroundColor: theme.colors.background },
            ]}
            height={height / 2.3}>
            <Image
                style={styles.image}
                width={width}
                height={height / 2}
                source={image}
            />
            <Block marginTop={width / 5} width={width} paddingHorizontal={20}>
                <Text
                    color={theme.colors.textInBox}
                    fontType="bold1"
                    size={20}
                    style={styles.textTitle}
                    center>
                    {item.title}
                </Text>
                <Text
                    fontType="medium1"
                    style={styles.textDescription}
                    size={15}
                    center>
                    {item.description}
                </Text>
            </Block>
        </Block>
    );
};

export default ItemWelcome;

const styles = StyleSheet.create({
    cardView: {
        flex: 1,
        position: 'relative',
        width: '80%',
        margin: 10,
        borderRadius: 10,
    },
    image: {
        marginHorizontal: 5,
        borderRadius: 0,
    },
    textDescription: {
        color: '#9D9D9D',
        lineHeight: 21,
        marginTop: 15,
        marginHorizontal: 20,
    },
    textTitle: {
        lineHeight: 30,
    },
    text: {
        position: 'absolute',
        justifyContent: 'center',
    },
});
