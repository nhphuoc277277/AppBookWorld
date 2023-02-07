/* eslint-disable react-native/no-inline-styles */
import { icons } from '@assets';
import { Block, Icon, Text } from '@components';
import { useAppSelector } from '@hooks';
import { theme } from '@theme';
import { getSize } from '@utils/responsive';
import React, { useState } from 'react';
import { Image, Pressable, TextInput } from 'react-native';
import { useTheme } from 'themeNew';
import styles from './styles';

const InputText = ({
    setRef,
    iconLeft,
    iconRight,
    placeholder,
    keyboardType,
    onChangeText,
    onChange,
    value,
    style,
    containerStyle,
    inputStyle,
    isSecure,
    isError,
    errorText,
    errorContainerStyle,
    errorTextStyles,
    onFocus,
    returnKeyType,
    onSubmitEditing,
    colorErr,
    colorNotErr,
    label,
    onEndEditing,
}) => {
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const { colors } = useTheme(themeStore);
    const [secureEye, setSecureEye] = useState(true);
    const ColorErr = colorErr || colors.primary;
    const ColorNotErr = colorNotErr || colors.grey12;

    const _renderSecureIcon = () => {
        return (
            <Pressable
                hitSlop={{ left: 5, right: 5, bottom: 5, top: 5 }}
                onPress={() => setSecureEye(!secureEye)}>
                <Icon
                    component="Ionicons"
                    name={secureEye ? 'ios-eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={colors.textInBox}
                />
            </Pressable>
        );
    };

    const _renderError = () => (
        <Block row style={errorContainerStyle} alignCenter>
            <Icon
                component="Ionicons"
                size={20}
                color={colors.primary}
                name="warning"
            />
            <Text
                style={errorTextStyles}
                marginLeft={5}
                size={13}
                color={theme.colors.red}>
                {errorText}
            </Text>
        </Block>
    );

    return (
        <Block marginVertical={5} style={containerStyle}>
            <Text
                color={colors.textInBox}
                paddingBottom={5}
                size={12}
                marginLeft={2}>
                {label}
            </Text>
            <Block
                row
                width={'100%'}
                alignCenter
                paddingHorizontal={12}
                radius={10}
                borderWidth={1.5}
                borderColor={isError ? ColorErr : ColorNotErr}
                style={style}>
                {iconLeft && iconLeft()}
                <TextInput
                    ref={setRef}
                    style={{
                        flex: 1,
                        height: '100%',
                        color: colors.textInBox,
                        ...inputStyle,
                    }}
                    secureTextEntry={secureEye && isSecure}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    placeholderTextColor={theme.colors.placeholder}
                    value={value}
                    onChangeText={text => onChangeText(text)}
                    onFocus={onFocus}
                    onChange={onChange}
                    returnKeyType={returnKeyType}
                    onSubmitEditing={onSubmitEditing}
                    cursorColor={colors.primary}
                    onEndEditing={onEndEditing}
                />
                {isSecure && _renderSecureIcon()}
                {/* {isSecure ? _renderSecureIcon() : iconRight && iconRight()} */}
            </Block>
            {isError && Boolean(errorText) && _renderError()}
        </Block>
    );
};

export default InputText;
