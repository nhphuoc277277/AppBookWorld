import { Block, Text } from '@components';
import { WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import { useAppSelector } from '@hooks';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { theme } from '@theme';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'themeNew';
const TopBarrr = props => {
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
    const themeNew = useTheme(themeStore);

    const navigation = useNavigation();
    const Title = ({ title }) => {
        return (
            <Text
                justifyCenter
                alignCenter
                flex
                size={20}
                color={themeNew.colors.textInBox}
                fontType="bold">
                {title}
            </Text>
        );
    };
    const backIcon = () => {
        return (
            <Block justifyCenter width={50} paddingVertical={2}>
                <Feather
                    onPress={() => {
                        navigation.goBack();
                        handleBack && handleBack();
                    }}
                    size={Platform.OS === 'ios' ? 40 : 28}
                    color={theme.colors.textInBox}
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
                space={'between'}>
                {backIcon()}
                <Block alignCenter justifyCenter>
                    <Text
                        color={themeNew.colors.text}
                        size={18}
                        fontType={'bold'}>
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
                    backgroundColor={themeNew.colors.textInBox}>
                    {renderBackHeader()}
                </Block>
            ) : (
                <Block
                    style={{
                        // marginTop: insets.top,
                        backgroundColor: backgroundColor
                            ? backgroundColor
                            : themeNew.colors.text,
                        height: HEIGHT_HEADER,
                    }}
                    alignCenter
                    justifyCenter
                    row>
                    <Title title={title} />
                    {children}
                </Block>
            )}
        </>
    );
};

export default TopBarrr;
