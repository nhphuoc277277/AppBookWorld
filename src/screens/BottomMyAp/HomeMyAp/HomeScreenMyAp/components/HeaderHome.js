import { icons } from '@assets';
import { Block, Button, Text } from '@components';
import IconView from '@components/Icon';
import { useAppDispatch, useAppSelector } from '@hooks';
import { routes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { changeLanguage, changeTheme } from '@redux/reducerNew';
import { theme } from '@theme';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { withNamespaces } from 'react-i18next';
import {
    Image,
    NativeModules,
    Platform,
    StatusBar,
    // Text as Text1,
} from 'react-native';
import { makeStyles, useTheme } from 'themeNew';

const { fonts } = theme;

const HeaderHome = props => {
    const { name, image, setIsCollapsible, isCollapsible, t } = props;
    const navigation = useNavigation();
    const [paddingTop, setPaddingTop] = useState(0);
    const [showMoney, setShowMoney] = useState(false);
    const dispatch = useAppDispatch();

    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const languageStore = useAppSelector(state => state.root.setting.language);
    const themeNew = useTheme(themeStore);
    const styles = useStyle(props, themeStore);

    useEffect(() => {
        if (Platform.OS === 'ios') {
            NativeModules.StatusBarManager.getHeight(statusBarHeight => {
                const STATUS_BAR_HEIGHT = statusBarHeight.height;
                setPaddingTop(STATUS_BAR_HEIGHT);
            });
        } else {
            const STATUS_BAR_HEIGHT = StatusBar.currentHeight;
            setPaddingTop(STATUS_BAR_HEIGHT);
        }
    }, []);

    return (
        <Block
            width="100%"
            borderBottomWidth={1}
            borderColor={themeNew.colors.grey12}
            space={'between'}
            row
            backgroundColor={themeNew.colors.background}
            paddingVertical={20}>
            <Block alignCenter row marginLeft={15} flex>
                <Image
                    source={!isEmpty(image) ? { uri: image } : icons.logo}
                    style={{ width: 40, height: 40, borderRadius: 100 }}
                />
                <Block flexGrow={1}>
                    <Text
                        marginLeft={10}
                        size={12}
                        fontType="medium1"
                        marginHorizontal={5}
                        color={themeNew.colors.grey8}>
                        Welcom to BookWorld!
                    </Text>
                    <Text
                        marginLeft={10}
                        marginRight={40}
                        size={18}
                        marginHorizontal={5}
                        color={themeNew.colors.textInBox}
                        fontType="medium1"
                        numberOfLines={1}>
                        {isEmpty(name.trim()) ? 'Update name' : name}
                    </Text>
                </Block>
            </Block>

            <Block marginRight={15}>
                <Button
                    onPress={() =>
                        navigation.navigate(routes.NOTIFICATION_SCREEN)
                    }>
                    <IconView
                        component={'MaterialCommunityIcons'}
                        name={'bell-outline'}
                        size={25}
                        color={themeNew.colors.textInBox}
                    />
                </Button>
            </Block>
            {/* </ImageBackground> */}
        </Block>
    );
};

const useStyle = makeStyles()(({ normalize, colors }) => ({
    container: {
        paddingHorizontal: -20,
    },
    bg_sell: {
        width: '100%',
        height: 150,
        zIndex: 0,
        flex: 1,
        resizeMode: 'cover',
    },
    border_bg_sell: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    borderPersent: {
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    textDecoration: {
        textDecorationLine: 'line-through',
        textDecorationColor: 'black',
    },
    btnBuyNow: {
        borderRadius: 8,
        backgroundColor: colors.lightGreen1,
        paddingHorizontal: 30,
        paddingVertical: 8,
        marginTop: 5,
    },
    btnExpand: {
        backgroundColor: colors.text,
        borderRadius: 50,
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: -15,
    },
}));

export default withNamespaces()(HeaderHome);
