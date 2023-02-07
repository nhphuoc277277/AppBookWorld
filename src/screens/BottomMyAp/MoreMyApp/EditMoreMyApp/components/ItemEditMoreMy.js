import { Block, Text } from '@components';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import IconView from '@components/Icon';
import { routes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { makeStyles, useTheme } from 'themeNew';
import { useAppSelector, useAppDispatch } from '@hooks';
import { withNamespaces } from 'react-i18next';

const ItemEditMoreMy = props => {
    const navigation = useNavigation();
    const { t } = props;

    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const themeNew = useTheme(themeStore);
    const styles = useStyle(props, themeStore);

    return (
        <Block relative>
            <Block marginHorizontal={25}>
                <Text
                    fontType={'bold'}
                    color={themeNew.colors.textDark}
                    size={16}
                    marginVertical={10}>
                    {t('purchase')}
                </Text>
                <Block>
                    <TouchableOpacity
                        style={[styles.btnItem, styles.shadowColor]}
                        onPress={() =>
                            navigation.navigate(routes.PURCHASE_HISTORY)
                        }>
                        <Block
                            marginHorizontal={10}
                            backgroundColor={'#00000020'}
                            width={40}
                            height={40}
                            alignCenter
                            justifyContent="center"
                            borderRadius={10}>
                            <Block>
                                <IconView
                                    component={'FontAwesome5'}
                                    name={'clipboard-list'}
                                    size={25}
                                    color={themeNew.colors.Orange}
                                />
                            </Block>
                        </Block>
                        <Block column absolute marginLeft={60}>
                            <Text
                                fontType={'medium1'}
                                color={themeNew.colors.textDark}
                                size={16}>
                                {t('purchaseHistory')}
                            </Text>
                            <Text color={themeNew.colors.textDark} size={12}>
                                {t('viewPurchase')}
                            </Text>
                        </Block>
                        <Block style={styles.iconItemMoreMy}>
                            <IconView
                                component={'AntDesigns'}
                                name={'right'}
                                size={15}
                                color={themeNew.colors.textDark}
                            />
                        </Block>
                    </TouchableOpacity>
                </Block>
                <Text
                    fontType={'bold'}
                    color={themeNew.colors.textDark}
                    size={16}
                    marginVertical={10}>
                    {t('settings')}
                </Text>
                <Block>
                    <TouchableOpacity
                        style={[styles.btnItem, styles.shadowColor]}
                        onPress={() =>
                            navigation.navigate(routes.EDIT_PROFILE_SCREEN)
                        }>
                        <Block
                            marginHorizontal={10}
                            backgroundColor={'#00000020'}
                            width={40}
                            height={40}
                            alignCenter
                            justifyContent="center"
                            borderRadius={10}>
                            <Block>
                                <IconView
                                    component={'Ionicons'}
                                    name={'settings'}
                                    size={25}
                                    color={themeNew.colors.primary}
                                />
                            </Block>
                        </Block>
                        <Block column absolute marginLeft={60}>
                            <Text
                                fontType={'medium1'}
                                color={themeNew.colors.textDark}
                                size={16}>
                                {t('editProfile')}
                            </Text>
                            <Text color={themeNew.colors.textDark} size={12}>
                                {t('updateAndEdit')}
                            </Text>
                        </Block>
                        <Block style={styles.iconItemMoreMy}>
                            <IconView
                                component={'AntDesigns'}
                                name={'right'}
                                size={15}
                                color={themeNew.colors.textDark}
                            />
                        </Block>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.btnItem, styles.shadowColor]}>
                        <Block
                            marginHorizontal={10}
                            backgroundColor={'#00000020'}
                            width={40}
                            height={40}
                            alignCenter
                            justifyContent="center"
                            borderRadius={10}>
                            <Block>
                                <IconView
                                    component={'MaterialCommunityIcons'}
                                    name={'shield-lock'}
                                    size={25}
                                    color={themeNew.colors.green}
                                />
                            </Block>
                        </Block>
                        <Block column absolute marginLeft={60}>
                            <Text
                                fontType={'medium1'}
                                color={themeNew.colors.textDark}
                                size={16}>
                                {t('privacy')}
                            </Text>
                            <Text color={themeNew.colors.textDark} size={12}>
                                {t('changePassword')}
                            </Text>
                        </Block>
                        <Block style={styles.iconItemMoreMy}>
                            <IconView
                                component={'AntDesigns'}
                                name={'right'}
                                size={15}
                                color={themeNew.colors.textDark}
                            />
                        </Block>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.btnItem, styles.shadowColor]}>
                        <Block
                            marginHorizontal={10}
                            backgroundColor={'#00000020'}
                            width={40}
                            height={40}
                            alignCenter
                            justifyContent="center"
                            borderRadius={10}>
                            <Block>
                                <IconView
                                    component={'MaterialIcons'}
                                    name={'notifications-active'}
                                    size={25}
                                    color={themeNew.colors.blue}
                                />
                            </Block>
                        </Block>

                        <Block column absolute marginLeft={60}>
                            <Text
                                fontType={'medium1'}
                                color={themeNew.colors.textDark}
                                size={16}>
                                {t('notification')}
                            </Text>
                            <Text fontType={'regular1'} color={themeNew.colors.textDark} size={12}>
                                {t('notificationSettings')}
                            </Text>
                        </Block>
                        <Block style={styles.iconItemMoreMy}>
                            <IconView
                                component={'AntDesigns'}
                                name={'right'}
                                size={15}
                                color={themeNew.colors.textDark}
                            />
                        </Block>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.btnItem, styles.shadowColor]}
                        onPress={() => navigation.navigate(routes.THEME_MODE)}>
                        <Block
                            marginHorizontal={10}
                            backgroundColor={'#00000020'}
                            width={40}
                            height={40}
                            alignCenter
                            justifyContent="center"
                            borderRadius={10}>
                            <Block>
                                <IconView
                                    component={'Feather'}
                                    name={'moon'}
                                    size={25}
                                    color={themeNew.colors.Pink}
                                />
                            </Block>
                        </Block>
                        <Block column absolute marginLeft={60}>
                            <Text
                                fontType={'medium1'}
                                color={themeNew.colors.textDark}
                                size={16}>
                                {t('darkMode')}
                            </Text>
                            <Text fontType={'regular1'} color={themeNew.colors.textDark} size={12}>
                                {t('changeScreenMode')}
                            </Text>
                        </Block>
                        <Block style={styles.iconItemMoreMy}>
                            <IconView
                                component={'AntDesigns'}
                                name={'right'}
                                size={15}
                                color={themeNew.colors.textDark}
                            />
                        </Block>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.btnItem, styles.shadowColor]}
                        onPress={() =>
                            navigation.navigate(routes.CHANGE_LANGUAGE)
                        }>
                        <Block
                            marginHorizontal={10}
                            backgroundColor={'#00000020'}
                            width={40}
                            height={40}
                            alignCenter
                            justifyContent="center"
                            borderRadius={10}>
                            <Block>
                                <IconView
                                    component={'Entypo'}
                                    name={'language'}
                                    size={25}
                                    color={themeNew.colors.basic}
                                />
                            </Block>
                        </Block>
                        <Block column absolute marginLeft={60}>
                            <Text
                                fontType={'medium1'}
                                color={themeNew.colors.textDark}
                                size={16}>
                                {t('language')}
                            </Text>
                            <Text color={themeNew.colors.textDark} size={12}>
                                {t('changeLanguageSettings')}
                            </Text>
                        </Block>
                        <Block style={styles.iconItemMoreMy}>
                            <IconView
                                component={'AntDesigns'}
                                name={'right'}
                                size={15}
                                color={themeNew.colors.textDark}
                            />
                        </Block>
                    </TouchableOpacity>
                </Block>
            </Block>
        </Block>
    );
};

export default withNamespaces()(ItemEditMoreMy);

const useStyle = makeStyles()(({ colors }) => ({
    btnItem: {
        width: '100%',
        height: 55,
        marginVertical: 10,
        backgroundColor: colors.backgroundDark2,
        borderRadius: 10,
        justifyContent: 'center',
    },
    shadowColor: {
        shadowColor: colors.grey12,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1.97,
        shadowRadius: 2.65,

        elevation: 6,
    },
    iconItemMoreMy: {
        position: 'absolute',
        right: 20,
    },
    text2: {
        position: 'absolute',
        left: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
}));
