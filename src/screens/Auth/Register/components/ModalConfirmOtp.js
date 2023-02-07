import { Block, ModalBox, Text, TextInput } from '@components';
import { useAppSelector } from '@hooks';
import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {colors, useTheme } from 'themeNew';

const ModalConfirmOtp = ({
    confirmCode,
    showModal,
    setShowModal,
    setCodeOTP,
    codeOTP,
    phone,
}) => {
    useEffect(() => {
        setShowModal(showModal);
    }, [showModal]);

    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const { colors } = useTheme(themeStore);

    return (
        <ModalBox
            onBackdropPress={() => setShowModal(!showModal)}
            transparent={true}
            isVisible={showModal}>
            <Block
                style={{
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.background,
                }}
                marginHorizontal={20}
                radius={15}
                padding={20}>
                <Text
                    style={{
                        fontSize: 15,
                        lineHeight: 23,
                        color: colors.textInBox,
                        fontStyle: 'normal',
                    }}
                    center>
                    Mã OTP đã được gửi về số điện thoại của bạn
                </Text>
                <Text
                    marginTop={18}
                    style={{
                        fontWeight: 'bold',
                        fontSize: 15,
                        lineHeight: 23,
                        color: colors.textInBox,
                    }}>
                    {phone}
                </Text>

                <TextInput
                    value={codeOTP}
                    onChangeText={setCodeOTP}
                    keyboardType="numeric"
                    placeholder={'OTP'}
                    inputStyle={{
                        paddingHorizontal: '40%',
                        color: colors.textInBox,
                    }}
                />
                <TouchableOpacity
                    style={{
                        width: '100%',
                        marginTop: 43,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 15,
                        backgroundColor: colors.primary,
                        height: 50,
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 6,
                        elevation: 7,
                    }}
                    onPress={confirmCode}>
                    <Text
                        style={{
                            fontSize: 16,
                            lineHeight: 50,
                            alignItems: 'center',
                            fontWeight: '700',
                            color: colors.textInBox,
                        }}
                        height={55}>
                        Đồng ý
                    </Text>
                </TouchableOpacity>
            </Block>
        </ModalBox>
    );
};

export default ModalConfirmOtp;

const styles = ({ isDisable }) =>
    StyleSheet.create({
        textOPTContainer: {
            justifyContent: 'center',
            flexDirection: 'row',
            marginTop: 24,
        },
        textInputOTP: {
            width: 50,
            height: 50,
            marginHorizontal: 10,
            backgroundColor: '#FBFBFB',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#14224A',
            alignContent: 'center',
            paddingHorizontal: 20,
            fontSize: 20,
        },
        textPhone: {
            fontWeight: 'bold',
            fontSize: 15,
            lineHeight: 23,
            color: '#000000',
        },
        textOTP: {
            fontSize: 15,
            lineHeight: 23,
            color: '#575555',
            fontStyle: 'normal',
        },
        modalContainer: {
            width: '88%',
            backgroundColor: 'white',
            paddingHorizontal: 20,
            paddingVertical: 30,
            borderRadius: 30,
            borderWidth: 1.5,
            borderColor: 'black',
        },
        modalBackGround: {
            backgroundColor: 'white',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
        },
        textButtomLogin: {
            fontSize: 16,
            lineHeight: 50,
            alignItems: 'center',
            fontWeight: '700',
            color: '#FFFFFF',
        },
        buttomLogin: {
            width: '100%',
            marginTop: 43,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            backgroundColor: colors.light.primary,
            height: 50,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 1,
            shadowRadius: 6,
            elevation: 7,
        },
        textInput2: {
            borderRadius: 15,
            width: '88%',
            color: '#818181',
            height: 59,
            fontWeight: '600',
            backgroundColor: '#F3F3F3',
            marginTop: 16,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 3,
            },
            paddingLeft: 18,
            shadowOpacity: 1,
            shadowRadius: 6,

            elevation: 7,
        },
        textInput: {
            borderRadius: 15,
            width: '88%',
            color: '#818181',
            height: 59,
            fontWeight: '600',
            backgroundColor: '#F3F3F3',
            marginTop: 10,
            paddingHorizontal: 20,
        },
        textWelcomLogin: {
            fontWeight: 'bold',
            lineHeight: 45,
            color: '#464444',
        },
        textDescribe: {
            marginTop: 18,
            fontWeight: '500',
        },
    });
