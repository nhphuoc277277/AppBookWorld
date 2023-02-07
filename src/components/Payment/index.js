import {
    useStripe,
    BillingDetails,
    CardForm,
} from '@stripe/stripe-react-native';
import React, { useState, useEffect } from 'react';
import { Block, Text, HeaderWithButton, ModalBox } from '@components';
import {
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
    Modal,
} from 'react-native';
import { useTheme } from 'themeNew';
import { useAppSelector } from '@hooks';
import {
    useCreatePaymentChapterMutation,
    useCreatePaymentMutation,
} from '@redux/servicesNew';
import { useNavigation } from '@react-navigation/native';
import { routes } from '@navigation/routes';
import { theme } from '@theme';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { changeLoading } from '@redux/reducerNew';
import { useAppDispatch } from 'hooks';
import {
    removeBookCart,
    removeBookPayment,
} from '@redux/reducerNew/cartReducer';
import { withNamespaces } from 'react-i18next';
const PaymentScreen = ({ price, t }) => {
    const ModalPoup = ({ visible, children }) => {
        const [showModal, setShowModal] = React.useState(visible);
        useEffect(() => {
            toggleModal();
        }, [visible]);

        const toggleModal = () => {
            if (visible) {
                setShowModal(true);
            } else {
                setShowModal(false);
            }
        };
        return (
            <Modal transparent visible={showModal}>
                <Block flex={1} style={styles.modalBackGround}>
                    <Block style={styles.modalContainer}>{children}</Block>
                </Block>
            </Modal>
        );
    };

    const [visibleCart, setVisibleCart] = useState(false);

    const [visibleCartErr, setVisibleCartErr] = useState(false);
    const navigation = useNavigation();

    const { confirmPayment } = useStripe();

    const [createPayment] = useCreatePaymentMutation();

    const [createPaymentChapter] = useCreatePaymentChapterMutation();

    const themeStore = useAppSelector(state => state.root.themeApp.theme);

    const bookStore = useAppSelector(state => state.root.cart.cartList);

    const myInfo = useAppSelector(state => state.root.auth);
    const { colors } = useTheme(themeStore);
    const dispatch = useAppDispatch();

    const amount = price; //So tien tong bill thanh toan
    const billingDetails: BillingDetails = {
        email: 'NameEmail@gmail.com',
        phone: '097888888',
        name: 'Nguyen Van A',
    };

    // console.log('>>>>>>>>>>>> bookStore', bookStore);
    const paymentChapter = async () => {
        let pay = {
            idChapter: [],
            totalPrice: price,
        };
        let idProducts = [];

        {
            bookStore.map(item => {
                if (item.status === true) {
                    idProducts.push(item._id);
                    let arrIdChapter = [];
                    for (var key of Object.keys(item.chapter)) {
                        arrIdChapter.push(item.chapter[key].idChapter);
                    }

                    pay.idChapter.push({
                        idBook: item._id,
                        idChapter: arrIdChapter,
                    });
                }
            });
        }
        const params = {
            body: pay,
            token: myInfo.token,
        };

        const response = await createPaymentChapter(params);
        dispatch(removeBookPayment(idProducts));

        if (response.data) {
            console.log('response: ');
        }
    };

    const initPayment = async () => {
        dispatch(changeLoading('SHOW'));
        const sentData = {
            amount: amount,
            currency: 'usd',
            paymentMethod: 'card',
        };

        const response = await createPayment({
            body: sentData,
            token: myInfo.token,
        });

        if (response.data) {
            const clientSecret = response.data.clientSecret;
            const { error, paymentIntent } = await confirmPayment(
                clientSecret,
                {
                    paymentMethodType: 'Card',
                    paymentMethodData: {
                        billingDetails,
                    },
                },
            );

            if (error) {
                console.log('Payment failued ', error);
                dispatch(changeLoading('HIDE'));
                setVisibleCartErr(true);
            } else {
                paymentChapter();
                console.log('Payment success ', paymentIntent);
                dispatch(changeLoading('HIDE'));
                setVisibleCart(true);
                setTimeout(function () {
                    setVisibleCart(false);
                    navigation.navigate(routes.CART_MY_AP);
                    dispatch(changeLoading('HIDE'));
                }, 3000);
                console.log('Thanh toán thành công');
            }
        } else {
            console.log('Intent server not responding correcdly...');
        }
    };

    return (
        <Block backgroundColor={colors.background} relative>
            <HeaderWithButton isBackHeader title={t('pay')} />
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                <Block alignCenter>
                    <Text
                        marginTop={30}
                        marginBottom={20}
                        size={16}
                        fontType="medium1"
                        color={colors.textInBox}>
                        {t('totalHaveToPay')}
                    </Text>
                    <Block
                        alignCenter
                        width={'90%'}
                        height={130}
                        marginBottom={20}
                        radius={20}
                        backgroundColor={colors.white}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            shadowColor: theme.colors.black,
                            shadowOffset: {
                                width: 0,
                                height: 7,
                            },
                            shadowOpacity: 1,
                            shadowRadius: 3,

                            elevation: 2.5,
                        }}>
                        <Text color={colors.grey4} size={35} fontType={'bold'}>
                            {price
                                .toFixed(0)
                                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                            đ
                        </Text>
                    </Block>
                    <Block
                        style={{
                            width: 400,
                            alignItems: 'center',
                            height: 700,
                            shadowColor: theme.colors.gray2,
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 12,
                            elevation: 5,
                        }}>
                        <CardForm
                            cardStyle={{
                                backgroundColor: colors.white,
                                textColor: 'black',
                                fontSize: 16,
                                borderRadius: 20,
                                cursorColor: colors.blue,
                                placeholderColor: colors.black,
                            }}
                            style={{
                                width: '90%',
                                height: 270,
                                shadowColor: theme.colors.gray2,
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 12,
                                elevation: 5,
                            }}
                            onFormComplete={cardDetails => {
                                console.log(cardDetails);
                            }}
                        />
                        <TouchableOpacity
                            onPress={initPayment}
                            style={{ width: '88%' }}>
                            <Block
                                marginTop={20}
                                justifyCenter
                                alignCenter
                                radius={10}
                                backgroundColor={theme.colors.lightRed}
                                style={{
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 50,
                                }}>
                                <Text size={16} color="white">
                                    Pay now
                                </Text>
                            </Block>
                        </TouchableOpacity>
                    </Block>
                </Block>
            </ScrollView>

            <ModalPoup visible={visibleCart}>
                <Block style={styles.clone}>
                    <Fontisto
                        name={'close-a'}
                        size={12}
                        color={'black'}
                        onPress={() => {
                            setVisibleCart(false);
                        }}
                    />
                </Block>
                <Block alignCenter={'center'}>
                    <Block>
                        <Image
                            source={require('../../assets/icons/success.png')}
                            style={{ width: 70, height: 70 }}
                        />
                    </Block>
                    <Text style={styles.textOTP} center>
                        {t('paymentSuccess')}
                    </Text>
                </Block>
            </ModalPoup>

            <ModalBox
                isVisible={visibleCartErr}
                onBackdropPress={() => setVisibleCartErr(!visibleCartErr)}>
                <Block
                    backgroundColor={'white'}
                    radius={15}
                    alignSelf={'center'}
                    justifyCenter={'center'}
                    padding={20}>
                    <Block alignCenter={'center'}>
                        <Block>
                            <Image
                                source={require('../../assets/icons/faile.png')}
                                style={{ width: 70, height: 70 }}
                            />
                        </Block>
                        <Text style={styles.textOTP} center>
                            {t('paymentFailed')}
                        </Text>
                        <TouchableOpacity
                            style={{ marginTop: 10 }}
                            center
                            onPress={() => {
                                setVisibleCartErr(false);
                            }}>
                            <Text size={14}>{t('checkInfo')}</Text>
                        </TouchableOpacity>
                    </Block>
                </Block>
            </ModalBox>
        </Block>
    );
};

const styles = StyleSheet.create({
    textOTP: {
        marginTop: 30,
        fontWeight: '700',
        fontSize: 18,
    },
    clone: {
        alignItems: 'flex-end',
        marginRight: 10,
    },
    modalContainer: {
        width: '75%',
        backgroundColor: 'rgba(253,253,253,10)',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        borderColor: 'black',
    },

    modalBackGround: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
});
export default withNamespaces()(PaymentScreen);
