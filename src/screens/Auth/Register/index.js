import { Block, Text, TextInput, ModalBox } from '@components';
import { useAppDispatch, useAppSelector } from 'hooks';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import { useLoginPhoneMutation } from '@redux/servicesNew';
import { PHONE_REG_EXP } from '@utils/constants';
import React, { useMemo, useState, useEffect } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    ToastAndroid,
} from 'react-native';
import { useTheme } from 'themeNew';
import ModalConfirmOtp from './components/ModalConfirmOtp';
import { changeLoading } from '@redux/reducerNew';
import { useNavigation } from '@react-navigation/core';

async function getToken() {
    return await messaging().getToken();
}

const Register = () => {
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const [loginPhone] = useLoginPhoneMutation();
    const [phone, setPhone] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmOTP, setConfirmOTP] = useState(null);
    const [codeOTP, setCodeOTP] = useState('');
    const [showModal, setShowModal] = React.useState(false);
    const [visible, setVisible] = React.useState(false);
    const [visible1, setVisible1] = React.useState(false);
    const { colors } = useTheme(themeStore);
    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    const handleErrorPhone = useMemo(() => {
        if (phone.match(PHONE_REG_EXP) || phone.length == 0) {
            return [false, ''];
        } else {
            return [true, 'Format phone invalid'];
        }
    }, [phone]);

    const handleErrorNewPassword = useMemo(() => {
        if (newPassword.length > 5 || newPassword.length == 0) {
            return [false, ''];
        } else {
            return [true, 'New password at least 6 character'];
        }
    }, [newPassword]);

    const handleErrorComfirmPassword = useMemo(() => {
        if (newPassword === confirmPassword || confirmPassword.length == 0) {
            return [false, ''];
        } else {
            return [true, 'Confirm password nat match New Password'];
        }
    }, [confirmPassword, newPassword]);

    const handleErrorNo = useMemo(() => {
        if (
            newPassword.length == 0 &&
            confirmPassword.length == 0 &&
            phone.length == 0
        ) {
            return [true, ''];
        } else {
            return [false, ''];
        }
    }, [confirmPassword, newPassword, phone]);

    const handleSendLogin = useMemo(() => {
        if (
            !handleErrorPhone[1] &&
            !handleErrorNewPassword[1] &&
            !handleErrorComfirmPassword[1] &&
            !handleErrorNo[0]
        ) {
            return false;
        } else {
            return true;
        }
    }, [handleErrorPhone, handleErrorNewPassword, handleErrorComfirmPassword]);

    //Send OTP from Firebase
    const signInWithPhoneNumber = async () => {
        console.log('PHONE  +84 ' + phone);
        dispatch(changeLoading('SHOW'));
        const confirmation = await auth().signInWithPhoneNumber('+84 ' + phone);
        setConfirmOTP(confirmation);
        setShowModal(true);
    };

    //Confirm code OTP
    async function confirmCode() {
        try {
            dispatch(changeLoading('HIDE'));
            await confirmOTP.confirm(codeOTP);
            await callApiLogin();
        } catch (error) {
            dispatch(changeLoading('HIDE'));
            // setShowModal(false);
            setVisible1(true);
            console.log('Invalid code.');
        }
    }

    const callApiLogin = async () => {
        const data = {
            phoneUser: phone,
            passwordUser: newPassword,
            token_fcm: await getToken(),
        };
        const dataLogin = await loginPhone(data);
        if (dataLogin?.error?.data?.data === 'Số điện thoại đã tồn tại') {
            ToastAndroid.show(
                'Số điện thoại đã đăng kí rồi, xin hãy đăng nhập',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
            );
            navigation.goBack();
        } else {
            setVisible(true);
            navigation.goBack();
        }
        setShowModal(false);

        console.log('dataLogin ', dataLogin);
    };

    return (
        <Block
            flex
            alignCenter
            paddingTop={30}
            backgroundColor={colors.background}
            paddingHorizontal={20}>
            <Text
                h1
                fontType="bold1"
                size={30}
                style={styles.textWelcomLogin}
                color={colors.textInBox}>
                {' '}
                Xin Chào Bạn Mới{' '}
            </Text>
            <Text
                paddingHorizontal={45}
                marginVertical={40}
                size={13}
                lineHeight={20}
                fontType={'medium1'}
                center
                color={colors.textInBox}>
                {' '}
                Vui lòng đăng ký tài khoản để sử dụng ứng dụng Lưu ý nhập đầy đủ
                thông tin ở bên dưới{' '}
            </Text>

            <TextInput
                value={phone}
                onChangeText={setPhone}
                keyboardType="numeric"
                label={'Phone Number'}
                placeholder={'Số điện thoại'}
                color={colors.textInBox}
                errorText={handleErrorPhone[1]}
                isError={handleErrorPhone[0]}
            />
            <TextInput
                onChangeText={setNewPassword}
                value={newPassword}
                label={'New Password'}
                placeholder={'Mật khẩu'}
                isSecure={true}
                errorText={handleErrorNewPassword[1]}
                isError={handleErrorNewPassword[0]}
                color={colors.textInBox}
            />
            <TextInput
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                label={'Confirm Passord'}
                placeholder={'Nhập lại mật khẩu'}
                isSecure={true}
                errorText={handleErrorComfirmPassword[1]}
                isError={handleErrorComfirmPassword[0]}
            />
            <ModalBox
                isVisible={visible1}
                onBackdropPress={() => setVisible1(!visible1)}>
                <Block
                    backgroundColor={colors.background}
                    radius={15}
                    alignSelf={'center'}
                    justifyCenter={'center'}
                    padding={20}>
                    <Block alignCenter={'center'}>
                        <Text
                            color={colors.textInBox}
                            fontType="medium1"
                            style={{ fontWeight: '700', marginVertical: 20 }}>
                            Đăng ký không thành công
                        </Text>
                        <Block>
                            <Image
                                source={require('../../../assets/icons/faile.png')}
                                style={{ width: 55, height: 55 }}
                            />
                        </Block>
                        <Text
                            color={colors.textInBox}
                            fontType="medium1"
                            marginTop={10}
                            center>
                            OTP không đúng
                        </Text>
                    </Block>
                </Block>
            </ModalBox>
            <ModalBox
                isVisible={visible}
                onBackdropPress={() => setVisible(!visible)}>
                <Block
                    backgroundColor={colors.background}
                    radius={15}
                    alignSelf={'center'}
                    justifyCenter={'center'}
                    padding={20}>
                    <Block alignCenter={'center'}>
                        <Block>
                            <Image
                                source={require('../../../assets/icons/success.png')}
                                style={{ width: 70, height: 70 }}
                            />
                        </Block>
                        <Text
                            marginTop={10}
                            center
                            color={colors.textInBox}
                            fontType="medium1">
                            Đăng ký thành công
                        </Text>
                    </Block>
                </Block>
            </ModalBox>
            <ModalConfirmOtp
                confirmCode={confirmCode}
                setShowModal={setShowModal}
                showModal={showModal}
                setConfirmOTP={setConfirmOTP}
                setCodeOTP={setCodeOTP}
                codeOTP={codeOTP}
                phone={phone}
            />

            <TouchableOpacity
                onPress={signInWithPhoneNumber}
                disabled={handleSendLogin}
                style={styles({ isDisable: handleSendLogin }).buttomLogin}
                height={59}>
                <Text
                    style={{
                        fontSize: 16,
                        lineHeight: 50,
                        alignItems: 'center',
                        fontWeight: '700',
                        fontFamily: 'Poppins',
                        color: '#FFFFFF',
                    }}>
                    Đăng ký
                </Text>
            </TouchableOpacity>
        </Block>
    );
};

export default Register;

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
            backgroundColor: 'rgba(253,253,253,0.5)',
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
            backgroundColor: isDisable ? '#818181' : '#E83625',
            height: 50,
            shadowColor: '#000',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
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
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
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
        },
        textDescribe: {
            marginTop: 18,
            fontWeight: '500',
        },
    });
