import { StyleSheet, Text, Animated } from 'react-native'
import React from 'react'
import { useAppSelector } from 'hooks';
import { withNamespaces } from 'react-i18next';
import { Block, HeaderWithButton } from '@components'
import { useTheme } from 'themeNew';
import ItemCateBook from './ItemCateBook';
import { height, width } from '@utils/responsive';

const ITEM_WITH = width * 0.6;

const widthItemEventIncoming = width - width / 3;
const WIDTH_ITEM_INVIEW = widthItemEventIncoming - 20;
const SeeMoreScreen = ({ t }) => {
    const allBooks = useAppSelector(state => state.root.book.bookList);
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const themeNew = useTheme(themeStore);
    let freeBook = [];
    allBooks.map(item => {
        if (item.isPrice === null || item.isPrice === 0) {
            freeBook.push(item);
        }
    });
    return (
        <Block backgroundColor={themeNew.colors.background} flex >
            <HeaderWithButton isBackHeader title={t('freeBook')} />
            <Block style={styles.container}>
                <Animated.FlatList
                    data={freeBook}
                    keyExtractor={item => item.toString()}
                    renderItem={item => <ItemCateBook item={item.item} />}
                    bounces={false}
                    nestedScrollEnabled={true}
                    ListEmptyComponent={
                        <Block
                            width={width}
                            height={WIDTH_ITEM_INVIEW}
                            justifyCenter
                            alignCenter>
                            <Text>Loading...</Text>
                        </Block>
                    }
                />
            </Block>
        </Block>
    )
}

export default withNamespaces()(SeeMoreScreen);

const styles = StyleSheet.create({
    container: {
        marginBottom: '20%'
    }
})