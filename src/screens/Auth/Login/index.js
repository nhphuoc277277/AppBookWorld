import { icons } from '@assets';
import { Block, Container, ModalBox, Text, TextInput } from '@components';
import { routes } from '@navigation/routes';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { changeLoading } from '@redux/reducerNew';
import {
    useForgotPasswordMutation,
    useLoginMutation,
    useLoginPhoneNumberMutation,
} from '@redux/servicesNew';
import { PHONE_REG_EXP } from '@utils/constants';
import { useAppDispatch, useAppSelector } from 'hooks';
import React, { useEffect, useMemo, useState } from 'react';
import { withNamespaces } from 'react-i18next';
import { Image, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-simple-toast';
import { colors, useTheme } from 'themeNew';

const Login = ({ t }) => {
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const theme = useTheme(themeStore);
    const [visible2, setVisible2] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [visible, setVisible] = useState(false);
    const [hide, setHide] = useState(false);
    const navigation = useNavigation();
    const [login, { isLoading: isUpdating }] = useLoginMutation();
    const [loginPhone, { isLoading: isUpDating }] =
        useLoginPhoneNumberMutation();
    const [forgotPass, { isLoading: isUpdate }] = useForgotPasswordMutation();
    const dispatch = useAppDispatch();
    const [visibleModal, setVisibleModal] = useState(false);
    const [phoneUser, setPhoneUser] = useState('');
    const [password, setPassword] = useState('');
    const [visibleNotifi, setVisibleNotifi] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmOTP, setConfirmOTP] = useState(null);
    const [codeOTP, setCodeOTP] = useState('');

    const [error, setError] = useState('');
    const inset = useSafeAreaInsets();

    const handleErrorPhone = useMemo(() => {
        if (phoneUser.match(PHONE_REG_EXP) || phoneUser.length == 0) {
            return [false, ''];
        } else {
            return [true, 'Format phone invalid'];
        }
    }, [phoneUser]);
    const handleErrorComfirmPassword = useMemo(() => {
        if (password === confirmPassword || confirmPassword.length == 0) {
            return [false, ''];
        } else {
            return [true, 'Confirm password nat match New Password'];
        }
    }, [confirmPassword, password]);
    const handleErrorOTP = useMemo(() => {
        if (codeOTP.length > 5 || codeOTP.length == 0) {
            return [false, ''];
        } else {
            return [true, 'OPT at least 6 character'];
        }
    }, [codeOTP]);

    const handleErrorNewPassword = useMemo(() => {
        if (password.length > 5 || password.length == 0) {
            return [false, ''];
        } else {
            return [true, 'New password at least 6 character'];
        }
    }, [password]);

    useEffect(() => {
        dispatch(changeLoading(isUpDating ? 'SHOW' : 'HIDE'));
    }, [dispatch, isUpDating]);

    useEffect(() => {
        dispatch(changeLoading(isUpdating ? 'SHOW' : 'HIDE'));
    }, [dispatch, isUpdating]);

    useEffect(() => {
        dispatch(changeLoading(isUpdate ? 'SHOW' : 'HIDE'));
    }, [dispatch, isUpdate]);

    GoogleSignin.configure({
        webClientId:
            '1078600024718-r4kttklrp4av6li4mqs9b5ctnhbm6aob.apps.googleusercontent.com',
    });

    async function getToken() {
        return await messaging().getToken();
    }

    const _signIngoogle = async () => {
        await GoogleSignin.signOut();
        const currentUser = await GoogleSignin.getCurrentUser();

        if (currentUser) {
            await GoogleSignin.revokeAccess();
        }

        try {
            // Get the users ID token
            // await GoogleSignin.hasPlayServices();
            const { idToken } = await GoogleSignin.signIn();
            // get fcm token
            const fcmToken = await getToken();

            _handleLogin(idToken, fcmToken);

            // Storage.setItem('tokenId', idToken);

            const googleCredential =
                auth.GoogleAuthProvider.credential(idToken);
            return auth().signInWithCredential(googleCredential);
        } catch (error) {
            console.log('=========> id error login', error);

            // await API.post('logs/write', {message: error});
        }
    };

    const _handleLogin = async (token, fcmToken) => {
        const body = {
            token: token,
            token_fcm: fcmToken,
        };
        const dataLogin = await login(body);
        if (dataLogin?.error?.data?.error) {
            setVisibleModal(true);
        }
    };

    const _handleLoginPhone = async () => {
        const body = {
            passwordUser: password,
            phoneUser: phoneUser,
            token_fcm: await getToken(),
        };
        const dataLogin = await loginPhone(body);
        if (dataLogin.data.data === 'Số điện thoại này chưa đăng ký') {
            setError('Số điện thoại này chưa đăng ký');
            setVisibleNotifi(true);
        } else if (dataLogin.data.message === 'Mật khẩu không đúng') {
            setError('Mật khẩu không đúng');
            setVisibleNotifi(true);
        } else {
            Toast.show('Đăng nhập thành công.', Toast.LONG);
        }
        // if (dataLogin?.error?.data?.error) {
        //     setVisibleModal(true);
        // }
    };
    const forgotPassword = async () => {
        console.log('PHONE  +84 ' + phoneUser);
        dispatch(changeLoading('SHOW'));
        const confirmation = await auth().signInWithPhoneNumber(
            '+84 ' + phoneUser,
        );
        setConfirmOTP(confirmation);
        setVisible2(true);
        setVisible(false);
    };
    //Confirm code OTP
    async function confirmCode() {
        try {
            dispatch(changeLoading('HIDE'));
            await confirmOTP.confirm(codeOTP);
            await callApiFogotPass();
            setVisible2(false);
            setVisible1(false);
        } catch (error) {
            dispatch(changeLoading('HIDE'));
            Toast.show('Mã OTP không chính xác', Toast.LONG);
            console.log('Invalid code.', error);
        }
    }
    const callApiFogotPass = async () => {
        const body = {
            phoneUser: phoneUser,
            passwordUser: password,
        };
        const dataForgot = await forgotPass(body);
        if (dataForgot.data.data === 'Đã reset thành công') {
            Toast.show('Thay đổi mật khẩu thành công.', Toast.LONG);
        } else {
            Toast.show('Tài khoản không tồn tại.', Toast.LONG);
            setPhoneUser(''), setPassword('');
        }
    };
    return (
        <Container
            style={{
                backgroundColor: theme.colors.background,
                flex: 1,
                alignItems: 'center',
                paddingHorizontal: 20,
            }}
            statusColor={theme.colors.background}>
            <Text
                fontType="bold"
                h1
                bold
                size={30}
                color={theme.colors.textInBox}
                style={styles.textWelcomLogin}>
                {' '}
                {t('welcomeBack')}{' '}
            </Text>
            <Text
                fontType="medium1"
                paddingHorizontal={61}
                size={13}
                lineHeight={20}
                center>
                {' '}
                {t('loginToUseApp')}{' '}
            </Text>
            <TextInput
                value={phoneUser}
                onChangeText={text => setPhoneUser(text)}
                keyboardType="numeric"
                label={'Phone Number'}
                placeholder={t('phone')}
                color={theme.colors.grey4}
                placeholderTextColor={theme.colors.grey10}
                errorText={handleErrorPhone[1]}
                isError={handleErrorPhone[0]}
            />
            <TextInput
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={hide}
                label={'Password'}
                placeholder={'Mật khẩu'}
                isSecure={true}
                errorText={handleErrorNewPassword[1]}
                isError={handleErrorNewPassword[0]}
            />
            <Text
                bold
                size={15}
                style={styles.textRemember}
                color={theme.colors.textInBox}
                fontType="medium1"
                onPress={() => setVisible(true)}>
                {' '}
                {t('forGot')}{' '}
            </Text>
            <TouchableOpacity
                style={styles.buttomLogin}
                onPress={() => _handleLoginPhone()}>
                <Text fontType="bold1" style={styles.textButtomLogin}>
                    {' '}
                    {t('login')}
                </Text>
            </TouchableOpacity>
            <Block marginTop={10}>
                <TouchableOpacity
                    onPress={() => _signIngoogle()}
                    style={styles.loginGoogle}
                    marginHorizontal={10}>
                    <Image
                        style={styles.icon}
                        source={require('../../../assets/images/GG.png')}
                    />
                    <Text
                        color={theme.colors.textInBox}
                        fontType="medium1"
                        style={styles.textLoginGmail}>
                        {t('logWithGoogle')}
                    </Text>
                </TouchableOpacity>
            </Block>
            <Block bottom={inset.bottom - 150}>
                <Text fontType="medium1" color={theme.colors.textInBox}>
                    {t('doNotHaveAnAccount')} {'  '}
                    <Text
                        fontType="bold1"
                        style={styles.textRegister}
                        onPress={() =>
                            navigation.navigate(routes.REGISTER_SCREEN)
                        }>
                        {t('register')}
                    </Text>
                </Text>
            </Block>

            {/* Modle when api wrong */}
            <ModalBox
                isVisible={visibleModal}
                onBackdropPress={() => setVisibleModal(!visibleModal)}>
                <Block
                    backgroundColor={'white'}
                    radius={15}
                    alignSelf={'center'}
                    justifyCenter={'center'}
                    padding={20}>
                    <Image source={icons.logo} style={styles.iconLogo} />
                    <Text>Server not work</Text>
                </Block>
            </ModalBox>
            <ModalBox
                isVisible={visible2}
                onBackdropPress={() => setVisible2(!visible2)}>
                <Block
                    backgroundColor={'white'}
                    radius={15}
                    alignSelf={'center'}
                    justifyCenter={'center'}
                    padding={20}>
                    <Block alignCenter={'center'}>
                        <Text style={styles.textOTP} center>
                            Đặt lại mật khẩu
                        </Text>
                        <Text marginTop={18} center>
                            Đặt lại mật khẩu mới cho tài khoản của bạn để có thể
                            đăng nhập.
                        </Text>

                        <TextInput
                            value={password}
                            onChangeText={text => setPassword(text)}
                            secureTextEntry={hide}
                            label={'Passord'}
                            placeholder={'Mật khẩu'}
                            isSecure={true}
                            errorText={handleErrorNewPassword[1]}
                            isError={handleErrorNewPassword[0]}
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
                        <Pressable
                            style={styles.buttomLogin}
                            onPress={() => {
                                setVisible1(true), setVisible2(false);
                            }}>
                            <Text style={styles.textButtomLogin} height={55}>
                                Thay đổi mật khẩu
                            </Text>
                        </Pressable>
                    </Block>
                </Block>
            </ModalBox>
            <ModalBox
                isVisible={visible1}
                onBackdropPress={() => setVisible1(!visible1)}>
                <Block
                    backgroundColor={'white'}
                    radius={15}
                    alignSelf={'center'}
                    justifyCenter={'center'}
                    padding={20}>
                    <Block alignCenter={'center'}>
                        <Text style={styles.textOTP} center>
                            Nhập mã OTP
                        </Text>
                        <Text marginTop={18} center>
                            Xác nhận mã OTP để thay đổi mật khẩu
                        </Text>
                        <TextInput
                            value={codeOTP}
                            onChangeText={text => setCodeOTP(text)}
                            keyboardType="numeric"
                            placeholder={t('OTP')}
                            inputStyle={styles.textInput1}
                            color={theme.colors.grey4}
                            placeholderTextColor={theme.colors.grey10}
                            errorText={handleErrorOTP[1]}
                            isError={handleErrorOTP[0]}
                        />
                        <Pressable
                            style={styles.buttomLogin}
                            onPress={confirmCode}>
                            <Text style={styles.textButtomLogin} height={55}>
                                Đồng ý
                            </Text>
                        </Pressable>
                    </Block>
                </Block>
            </ModalBox>
            <ModalBox
                isVisible={visible}
                onBackdropPress={() => setVisible(!visible)}>
                <Block
                    backgroundColor={'white'}
                    radius={15}
                    alignSelf={'center'}
                    justifyCenter={'center'}
                    padding={20}>
                    <Block alignCenter={'center'}>
                        <Text style={styles.textOTP}>Forgot password</Text>
                        <Text marginTop={18} center>
                            Nhập số điện thoại của bạn cho quy trình xác minh.
                            Chúng tôi sẽ gửi mã 4 chữ số cho bạn.
                        </Text>
                        <TextInput
                            value={phoneUser}
                            onChangeText={text => setPhoneUser(text)}
                            keyboardType="numeric"
                            label={'Số điện thoại'}
                            placeholder={t('phone')}
                            color={theme.colors.grey4}
                            placeholderTextColor={theme.colors.grey10}
                            errorText={handleErrorPhone[1]}
                            isError={handleErrorPhone[0]}
                        />
                        <Pressable
                            style={styles.buttomLogin}
                            onPress={forgotPassword}>
                            <Text style={styles.textButtomLogin} height={55}>
                                Tiếp tục
                            </Text>
                        </Pressable>
                    </Block>
                </Block>
            </ModalBox>
            <ModalBox
                isVisible={visibleNotifi}
                onBackdropPress={() => setVisibleNotifi(!visibleNotifi)}>
                <Block
                    backgroundColor={theme.colors.background}
                    radius={15}
                    alignSelf={'center'}
                    justifyCenter={'center'}
                    padding={20}
                    borderColor={theme.colors.grayPastel}
                    borderWidth={1}>
                    <Block alignCenter={'center'} justifyCenter={'center'}>
                        <Text
                            style={styles.textOTP}
                            center
                            color={theme.colors.textInBox}
                            fontType="medium">
                            Đăng nhập thất bại
                        </Text>
                        <Block>
                            <Image
                                source={require('../../../assets/icons/faile.png')}
                                style={{ width: 70, height: 70 }}
                            />
                        </Block>
                        <TouchableOpacity
                            style={{ marginTop: 20 }}
                            center
                            onPress={() => {
                                setVisibleNotifi(false);
                            }}>
                            <Text size={14}>{error}</Text>
                        </TouchableOpacity>
                    </Block>
                </Block>
            </ModalBox>
        </Container>
    );
};

export default withNamespaces()(Login);

const styles = StyleSheet.create({
    textInput1: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '40%',
    },
    hide: {
        position: 'absolute',
        left: '90%',
        top: '50%',
    },
    textInputOTP1: {
        width: 50,
        height: 60,
        marginHorizontal: 10,
        backgroundColor: '#FBFBFB',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#14224A',
        alignContent: 'center',
        paddingHorizontal: 20,
        fontSize: 20,
    },
    textOPTContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 24,
    },
    textPhoneContainer: {
        justifyContent: 'center',
        marginTop: 24,
    },
    textInputOTP: {
        width: 350,
        height: 50,
        marginHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 2,
        alignContent: 'center',
        paddingHorizontal: 20,
        fontSize: 16,
        borderWidth: 0.1,
    },
    textPhone: {
        lineHeight: 25,
        fontWeight: '700',
    },
    textOTP: {
        marginBottom: 10,
        fontWeight: '700',
        fontSize: 18,
    },
    modalContainer: {
        width: '100%',
        backgroundColor: 'rgba(253,253,253,10)',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 30,
    },
    modalBackGround: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    textRegister: {
        fontSize: 14,
        color: 'blue',
    },
    textLoginGmail: {
        marginLeft: '15%',
        fontSize: 15,
    },
    loginGoogle: {
        width: 230,
        height: 65,
        borderRadius: 10,
        paddingHorizontal: '5%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    lien: {
        marginTop: 7,
        marginHorizontal: 20,
    },
    or: {
        paddingLeft: 20,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    loginContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 32,
    },
    Ellip: {
        justifyContent: 'center',
        flexDirection: 'row',
        width: 47,
        height: 47,
        borderRadius: 52,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    image: {
        marginTop: 42,
    },
    gradients1: {
        position: 'absolute',
        width: 157,
        height: 10,
        backgroundColor: colors.light.primary,
    },
    gradients: {
        position: 'absolute',
        width: 157,
        height: 10,
        backgroundColor: colors.light.primary,
    },
    textButtomLogin: {
        fontSize: 16,
        lineHeight: 50,
        alignItems: 'center',
        color: '#FFFFFF',
        fontFamily: 'Lato-Bold',
    },
    buttomLogin: {
        width: '100%',
        height: 55,
        marginTop: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: colors.light.primary,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    textRemember: {
        lineHeight: 23,
        marginTop: 22,
        marginLeft: '57%',
    },
    textInput2: {
        borderRadius: 10,
        fontSize: 16,
        fontWeight: '600',
        backgroundColor: '#F3F3F3',
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
        borderRadius: 10,
        width: '88%',
        fontSize: 16,
        height: 59,
        fontWeight: '600',
        backgroundColor: '#F3F3F3',
        // color: 'black',
        marginTop: 32,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    textWelcomLogin: {
        lineHeight: 45,
    },
    textDescribe: {
        marginTop: 12,
    },
    iconLogin: {
        marginTop: 32,
        width: 25,
        height: 25,
        marginHorizontal: 10,
    },
    iconLogo: {
        width: 50,
        height: 50,
        alignSelf: 'center',
    },
    icon: {
        width: 20,
        height: 20,
    },
});
