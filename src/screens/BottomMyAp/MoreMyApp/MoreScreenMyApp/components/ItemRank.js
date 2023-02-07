import { Block, Text } from '@components';
import { useAppSelector } from '@hooks';
import React from 'react';
import { withNamespaces } from 'react-i18next';
import { Image, TouchableOpacity, View } from 'react-native';
import { makeStyles } from 'themeNew';

const ItemRank = ({ item, t, index }) => {
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const styles = useStyles(themeStore);
    const time = (item.timeRead / 60 / 60).toFixed(0);

    return (
        <Block relative>
            <TouchableOpacity>
                <Block row style={styles.itemContainer} padding={10}>
                    <Block row justifyContent={'center'} alignItems={'center'}>
                        <Image
                            source={require('../../../../../assets/images/Vector.png')}
                        />
                        <Image
                            style={styles.imageRank}
                            source={{ uri: item?.image }}
                        />
                    </Block>
                    <View style={styles.item}>
                        <Text fontType={'bold1'} color="white" size={15}>
                            {item?.name}
                        </Text>
                        <Block marginVertical={10}>
                            <Block row>
                                <Text
                                    fontType={'medium1'}
                                    color="#9A9B9B"
                                    size={10}>
                                    {t('totalReadingTime')}:
                                </Text>
                                <Text
                                    fontType={'medium1'}
                                    color="#9A9B9B"
                                    size={10}
                                    marginHorizontal={4}>
                                    {time}
                                </Text>
                                <Text
                                    fontType={'medium1'}
                                    color="#9A9B9B"
                                    size={10}>
                                    {t('hours')}
                                </Text>
                            </Block>
                            <Block row>
                                <Text
                                    fontType={'medium1'}
                                    color="#9A9B9B"
                                    size={10}>
                                    {t('numberOfBooksRead')}:
                                </Text>
                                <Text
                                    fontType={'medium1'}
                                    color="#9A9B9B"
                                    size={10}
                                    marginHorizontal={5}>
                                    Đang cập nhật
                                </Text>
                            </Block>
                        </Block>
                    </View>
                    <Block row justifyContent={'center'}>
                        <View style={styles.rankContainer} opacity={0.15} />
                        <Text
                            style={styles.sttRank}
                            fontSize={15}
                            color="#FA4D96">
                            {index + 1}
                        </Text>
                    </Block>
                </Block>
            </TouchableOpacity>
        </Block>
    );
};

export default withNamespaces()(ItemRank);

const useStyles = makeStyles()(({ colors }) => ({
    itemContainer: {
        backgroundColor: '#242042',
        justifyContent: 'space-between',
        width: '100%',
        height: 100,
        borderRadius: 20,
        marginVertical: 10,
    },
    imageRank: {
        position: 'absolute',
        height: 50,
        width: 50,
        borderRadius: 35,
    },
    item: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    rankContainer: {
        width: 30,
        height: 30,
        backgroundColor: '#FA4D96',
        borderRadius: 8,
    },
    sttRank: {
        position: 'absolute',
        top: 4.5,
    },
}));
