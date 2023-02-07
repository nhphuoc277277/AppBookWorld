import { Block, Text } from '@components';
import { WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import { useAppSelector } from '@hooks';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'themeNew';
const HeaderWithButton = props => {
    const {
        title,
        isBackHeader,
        children,
        rightIcon,
        handleBack,
        backgroundColor,
    } = props;
    const insets = useSafeAreaInsets();
    const HEIGHT_HEADER = 50;
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const theme = useTheme(themeStore);

    const navigation = useNavigation();

    const backIcon = () => {
        return (
            <Block justifyCenter width={50} paddingVertical={2}>
                <Feather
                    onPress={() => {
                        navigation.goBack();
                        handleBack && handleBack();
                    }}
                    size={Platform.OS === 'ios' ? 30 : 24}
                    color={theme.colors.textDark}
                    name={Platform.OS === 'ios' ? 'chevron-left' : 'arrow-left'}
                />
            </Block>
        );
    };

    const renderBackHeader = () => {
        return (
            <Block
                width={WINDOW_WIDTH - 50}
                alignSelf="center"
                row
                space={'between'}
                backgroundColor={theme.colors.background}>
                {backIcon()}
                <Block alignCenter justifyCenter>
                    <Text
                        color={theme.colors.textInBox}
                        size={18}
                        fontType={'bold1'}>
                        {title}
                    </Text>
                </Block>
                <Block width={50} justifyCenter alignCenter>
                    {rightIcon}
                </Block>
            </Block>
        );
    };
    return (
        <>
            {isBackHeader ? (
                <Block
                    paddingVertical={15}
                    marginTop={insets.top}
                    justifyCenter
                    backgroundColor={
                        backgroundColor
                            ? backgroundColor
                            : theme.colors.background
                    }>
                    {renderBackHeader()}
                </Block>
            ) : (
                <Block
                    style={{
                        backgroundColor: backgroundColor
                            ? backgroundColor
                            : theme.colors.background,
                        height: HEIGHT_HEADER,
                    }}
                    flex
                    alignCenter
                    justifyCenter
                    marginTop={insets.top}
                    row>
                    <Text
                        flex
                        size={20}
                        color={theme.colors.redPastel}
                        fontType="bold1">
                        {title}
                    </Text>
                    {children}
                </Block>
            )}
        </>
    );
};

export default HeaderWithButton;
