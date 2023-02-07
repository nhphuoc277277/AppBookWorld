import { StyleSheet, View, Image, FlatList, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Block, HeaderWithButton, Text } from '@components';
import { theme } from '@theme';
import ItemNoti from './itemNoti';
import { useAppSelector } from 'hooks';
import { makeStyles, useTheme } from 'themeNew';
import { withNamespaces } from 'react-i18next';
const ScreenNotification = ({ t }) => {
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const themeNew = useTheme(themeStore);
    const myInfo = useAppSelector(state => state.root.auth);
    let dataNoti = myInfo.notification;
    return (
        <Block flex backgroundColor={themeNew.colors.background}>
            <HeaderWithButton isBackHeader title={t('notification')} />
            <ScrollView>
                {dataNoti.map((item, index) => (
                    <ItemNoti key={index} item={item} />
                ))}
            </ScrollView>
        </Block>
    );
};

export default withNamespaces()(ScreenNotification);

const styles = StyleSheet.create({});
