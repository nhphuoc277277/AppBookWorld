import { Block, Text } from '@components';
import React, { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import actions from '@redux/actions';
import { makeStyles, useTheme } from 'themeNew';
import { useAppSelector, useAppDispatch } from '@hooks';
import { withNamespaces } from 'react-i18next';
import { logoutReducer } from '@redux/reducerNew';

const ItemEditLastMoreMy = props => {
    GoogleSignin.configure({
        webClientId:
            '1078600024718-r4kttklrp4av6li4mqs9b5ctnhbm6aob.apps.googleusercontent.com',
    });

    const { t } = props;

    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const themeNew = useTheme(themeStore);
    const styles = useStyle(props, themeStore);

    const dispatch = useAppDispatch();
    const handleLogOut = async () => {
        try {
            await GoogleSignin.signOut();
            dispatch(logoutReducer());
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Block marginHorizontal={25} marginVertical={20}>
            <Pressable
                onPress={handleLogOut}
                style={[styles.buttonLastMoreMy, styles.shadowColor]}>
                <Text
                    fontType={'bold1'}
                    color={themeNew.colors.white}
                    size={16}>
                    {t('logout')}
                </Text>
            </Pressable>
        </Block>
    );
};

export default withNamespaces()(ItemEditLastMoreMy);

const useStyle = makeStyles()(({ colors }) => ({
    buttonLastMoreMy: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        backgroundColor: colors.primary,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text2: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
    },
}));
