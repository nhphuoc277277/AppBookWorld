import { Block, Text } from '@components';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import IconView from '@components/Icon';

import { routes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { makeStyles, useTheme } from 'themeNew';
import { useAppSelector, useAppDispatch } from '@hooks';
import { withNamespaces } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = props => {
    const navigation = useNavigation();
    const { t } = props;

    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const themeNew = useTheme(themeStore);
    const styles = useStyle(props, themeStore);
    const inset = useSafeAreaInsets();

    return (
        <Block justifyCenter paddingVertical={10} marginTop={inset.top}>
            <View style={styles.titleContainer}>
                <Text
                    size={20}
                    color={themeNew.colors.textDark}
                    fontType={'bold1'}>
                    {t('profile')}
                </Text>
            </View>
            <TouchableOpacity
                style={styles.editContainer}
                onPress={() =>
                    navigation.navigate(routes.SCREEN_EDIT_SETTINGS)
                }>
                <IconView
                    component={'Ionicons'}
                    name={'settings-sharp'}
                    size={24}
                    color={themeNew.colors.textDark}
                />
            </TouchableOpacity>
        </Block>
    );
};

export default withNamespaces()(Header);

const useStyle = makeStyles()(({ colors }) => ({
    titleContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    editContainer: {
        position: 'absolute',
        backgroundColor: '#FFFFFF50',
        opacity: 1,
        borderRadius: 40,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        right: 20,
    },
}));
