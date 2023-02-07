import { Block, Text } from '@components';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { makeStyles, useTheme } from 'themeNew';
import { withNamespaces } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '@hooks';
import { useGetReadTimeBookQuery } from '@redux/servicesNew';

const ItemMoreMy = ({ props, t }) => {
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const themeNew = useTheme(themeStore);
    const styles = useStyle(props, themeStore);
    const [sumTimeRead, setSumTimeRead] = useState(0);
    const [sumBookRead, setSumBookRead] = useState(0);
    const myInfo = useAppSelector(state => state.root.auth);
    const { data: dataReadTime } = useGetReadTimeBookQuery({
        params: myInfo._id,
        token: myInfo.token,
    });

    useEffect(() => {
        try {
            if (dataReadTime) {
                for (const year in dataReadTime) {
                    let sum = 0;
                    for (const month in dataReadTime[year]) {
                        for (const day in dataReadTime[year][month]) {
                            sum += dataReadTime[year][month][day];
                        }
                    }
                    setSumTimeRead((sum / 60 / 60).toFixed(0));
                    setSumBookRead(23);
                }
            }
        } catch (e) {
            console.log('[Error handleDataMonth] ', e);
        }
    }, [dataReadTime]);

    return (
        <Block marginTop={10} row justifyContent={'space-around'}>
            <Block style={[styles.dataContainer, styles.shadowColor]}>
                <Text
                    fontType={'medium1'}
                    center
                    color={themeNew.colors.textDark}>
                    {t('totalReadingTime')}
                </Text>
                <Text
                    fontType={'bold1'}
                    size={40}
                    center
                    color={themeNew.colors.textDark}>
                    {sumTimeRead}
                </Text>
                <Text
                    fontType={'medium1'}
                    center
                    color={themeNew.colors.textDark}>
                    {t('hours')}
                </Text>
            </Block>
            <Block style={[styles.dataContainer, styles.shadowColor]}>
                <Text
                    fontType={'medium1'}
                    center
                    color={themeNew.colors.textDark}>
                    {t('numberOfBooksRead')}
                </Text>
                <Text
                    fontType={'bold1'}
                    size={40}
                    center
                    color={themeNew.colors.textDark}>
                    {sumBookRead}
                </Text>
                <Text
                    fontType={'medium1'}
                    center
                    color={themeNew.colors.textDark}>
                    {t('book')}
                </Text>
            </Block>
        </Block>
    );
};

export default withNamespaces()(ItemMoreMy);

const useStyle = makeStyles()(({ colors }) => ({
    dataContainer: {
        backgroundColor: colors.backgroundDark2,
        borderRadius: 20,
        width: '42%',
        height: 150,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    shadowColor: {
        shadowColor: colors.textDark,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 4.65,
        elevation: 2,
    },
}));
