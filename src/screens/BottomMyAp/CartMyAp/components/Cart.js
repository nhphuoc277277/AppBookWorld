import { Block, Container, Text } from '@components';
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    FlatList,
    Image,
    Modal,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
// import { theme } from '@theme';
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { useAppSelector } from '@hooks';
import { routes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import {
    removeChapter,
    removeItem,
    saveStatusCartReducer,
} from '@redux/reducerNew/cartReducer';
import { theme } from '@theme';
import { useAppDispatch } from 'hooks';
import { withNamespaces } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { colors, useTheme } from 'themeNew';
import { isEmpty } from 'lodash';
import { width } from '@utils/responsive';
import FastImage from 'react-native-fast-image';
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

const Cart = ({ t }) => {
    const [visibleCart, setVisibleCart] = useState(false);
    const idBookDelete = useRef('');
    const navigation = useNavigation();
    const [allPrice, setAllPrice] = useState();
    const [cartItem, setCartItem] = useState({});
    const [data, setData] = useState([]);
    const inset = useSafeAreaInsets();
    const snapPoints = useMemo(() => [440 + inset.bottom], [inset.bottom]);
    const bottomSheetRef = useRef(null);
    const bookStore = useAppSelector(state => state.root.cart.cartList);
    const dispatch = useAppDispatch();
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const theme = useTheme(themeStore);
    let all = 0;

    useEffect(() => {
        if (cartItem?.chapter) {
            var chapter = Object.keys(cartItem?.chapter);
            setData(chapter);
        }
    }, [cartItem]);

    useEffect(() => {
        if (
            bookStore &&
            !isEmpty(data) &&
            bookStore[cartItem?.index]?.chapter
        ) {
            var chapter = Object.keys(bookStore[cartItem?.index].chapter);

            setData(chapter);
        }
    }, [bookStore]);

    useEffect(() => {
        setAllPrice((all = 0));
    }, [bookStore != 0]);
    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                {...props}
                enableTouchThrough={true}
            />
        ),
        [],
    );
    const numColumns = 3;
    const renderItem = ({ item, index }) => {
        let sum = 0;
        const priceBook = () => {
            for (const i in item.chapter) {
                sum += item.chapter[i].price;
            }
            if (item.status == true) {
                setAllPrice((all += sum));
            }
            return sum;
        };
        const detailCart = () => {
            let SL = Object.keys(item.chapter).length;
            setCartItem({ ...item, priceBook: sum, index: index, SL: SL });
            bottomSheetRef.current?.snapToIndex(0);
        };
        bookStore.map(item => {
            if (item.status == false) {
                setAllPrice((all += 0));
            }
        });

        return (
            <TouchableOpacity
                style={[
                    styles.ItemCart,
                    { backgroundColor: theme.colors.background },
                ]}
                onPress={() => detailCart(item, index)}>
                <Block row marginVertical={10}>
                    <FastImage
                        style={styles.image}
                        source={{
                            uri: item.image,
                            priority: FastImage.priority.high,
                        }}
                        resizeMode="cover"
                    />
                    <Block marginHorizontal={20} marginTop={5} width={'55%'}>
                        <Text numberOfLines={1} size={20} fontType={'bold1'}>
                            {item.name}
                        </Text>
                        <Text
                            color="#9D9D9D"
                            size={14}
                            numberOfLines={1}
                            marginTop={5}
                            fontType={'medium1'}>
                            {t('numberOfEpisodes')}:{' '}
                            {Object.keys(item.chapter).length}
                        </Text>
                        <Text
                            color="#9D9D9D"
                            size={14}
                            numberOfLines={1}
                            marginTop={5}>
                            {item.introduction}
                        </Text>
                        <Text fontType={'medium1'} style={styles.TextPrice}>
                            {priceBook()
                                .toFixed(0)
                                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}{' '}
                            ₫
                        </Text>
                    </Block>
                    <TouchableOpacity
                        style={{
                            alignItems: 'flex-start',
                            width: 40,
                            position: 'absolute',
                            marginLeft: '95%',
                            marginTop: '26%',
                        }}
                        onPress={() => {
                            setVisibleCart(true);
                            idBookDelete.current = item?._id;
                        }}>
                        <Feather name={'trash-2'} size={18} color={'gray'} />
                    </TouchableOpacity>
                    {item.status ? (
                        <TouchableOpacity
                            style={styles.CheckBox1}
                            onPress={() => {
                                dispatch(
                                    saveStatusCartReducer({
                                        index: index,
                                        status: false,
                                    }),
                                );
                            }}>
                            <AntDesign
                                name={'checkcircle'}
                                size={23}
                                color={theme.colors.green}
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={styles.CheckBox}
                            onPress={() => {
                                dispatch(
                                    saveStatusCartReducer({
                                        index: index,
                                        status: true,
                                    }),
                                );
                            }}>
                            <AntDesign
                                name={'checkcircleo'}
                                size={23}
                                color={'gray'}
                            />
                        </TouchableOpacity>
                    )}
                </Block>
            </TouchableOpacity>
        );
    };
    const renderChapterItem = ({ item, index }) => {
        const handleRemoveBook = () => {
            dispatch(removeItem({ _id: cartItem._id }));
            bottomSheetRef.current?.close();
            setData([]);
        };
        return (
            <Block style={styles.ItemCart1}>
                <TouchableOpacity
                    style={styles.hide}
                    onPress={() => {
                        {
                            cartItem.SL !== 1
                                ? dispatch(
                                      removeChapter({
                                          idBook: cartItem?._id,
                                          idChapter: item,
                                      }),
                                  )
                                : handleRemoveBook();
                        }
                    }}>
                    <Entypo name={'cross'} size={16} color={'black'} />
                </TouchableOpacity>
                <Block style={styles.chap} row marginVertical={10}>
                    <Text size={14}>
                        {t('chapTer')}{' '}
                        {cartItem?.chapter[item]?.chapterNumber &&
                            cartItem.chapter[item].chapterNumber}
                    </Text>
                </Block>
            </Block>
        );
    };

    return (
        <Container
            statusColor={theme.colors.background}
            edges={['left', 'right']}
            style={{ backgroundColor: theme.colors.background, flex: 1 }}>
            <Block justifyCenter alignCenter height={50} row>
                <Text
                    fontType="bold1"
                    color={theme.colors.textInBox}
                    size={20}
                    style={styles.textTitle}>
                    {t('yourCart')}
                </Text>
            </Block>
            <Block height={'80%'}>
                {bookStore ? (
                    <FlatList
                        data={bookStore}
                        renderItem={renderItem}
                        keyExtractor={item => Math.random()}
                        showsVerticalScrollIndicator={false}
                        style={{ backgroundColor: theme.colors.background }}
                    />
                ) : (
                    <Block alignCenter>
                        <Text
                            color={theme.colors.black}
                            center
                            marginTop={260}
                            size={16}>
                            {t('cartIsEmpty')}
                        </Text>
                    </Block>
                )}
            </Block>
            <Block bottom={4} marginTop={10}>
                <TouchableOpacity
                    disabled={allPrice === 0}
                    onPress={() =>
                        navigation.navigate(routes.DETAIL_CART, {
                            allPrice: allPrice,
                        })
                    }>
                    <Block
                        radius={30}
                        alignCenter
                        paddingVertical={10}
                        paddingHorizontal={20}
                        row
                        space={'between'}
                        flexShrink={1}
                        marginHorizontal={10}
                        backgroundColor={
                            allPrice === 0
                                ? theme.colors.grey10
                                : theme.colors.green
                        }>
                        <Text
                            fontType={'bold1'}
                            marginRight={10}
                            color="#ffffff"
                            size={18}>
                            {t('buy')}
                        </Text>
                        <Text
                            fontType={'medium1'}
                            color={theme.colors.white}
                            size={20}
                            style={styles.TextCart}
                            marginTop={5}>
                            {allPrice
                                ? allPrice &&
                                  allPrice
                                      .toFixed(0)
                                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                                : 0}{' '}
                            đ
                        </Text>
                    </Block>
                </TouchableOpacity>
            </Block>
            <BottomSheet
                index={-1}
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                backdropComponent={renderBackdrop}>
                <BottomSheetScrollView>
                    <Block
                        paddingVertical={10}
                        backgroundColor={theme.colors.background}>
                        <Block row style={styles.Container1}>
                            <Block backgroundColor={theme.colors.background}>
                                <Image
                                    style={styles.image1}
                                    source={{ uri: cartItem?.image }}
                                />
                            </Block>
                            <Block width={'53%'} marginTop={10}>
                                <Text
                                    fontType={'bold1'}
                                    size={20}
                                    color={theme.colors.textInBox}
                                    style={styles.Name}>
                                    {cartItem?.name}
                                </Text>
                                <Text
                                    color={theme.colors.textInBox}
                                    size={14}
                                    numberOfLines={1}
                                    marginTop={5}>
                                    {cartItem.introduction}
                                </Text>
                                <Text fontType={'medium1'} style={styles.Price}>
                                    {cartItem?.priceBook &&
                                        cartItem?.priceBook
                                            .toFixed(0)
                                            .replace(
                                                /(\d)(?=(\d{3})+(?!\d))/g,
                                                '$1.',
                                            )}{' '}
                                    ₫
                                </Text>
                            </Block>
                            <TouchableOpacity onPress={() => {}}>
                                <Fontisto
                                    name={'close-a'}
                                    size={20}
                                    color={theme.colors.textInBox}
                                    style={styles.hide}
                                />
                            </TouchableOpacity>
                        </Block>
                        <Block
                            marginTop={20}
                            width={'100%'}
                            height={1}
                            backgroundColor={'#bdc3c7'}
                            borderWidth={0.2}
                            borderColor={'#bdc3c7'}
                        />
                        <Text
                            marginVertical={10}
                            marginLeft={30}
                            style={styles.Name}
                            size={20}
                            color={theme.colors.textInBox}>
                            {t('chapTer')}
                        </Text>
                        <Block bottom={10} paddingLeft={10} paddingBottom={10}>
                            <FlatList
                                style={styles.FlatList1}
                                data={data}
                                renderItem={renderChapterItem}
                                keyExtractor={item => Math.random()}
                                showsVerticalScrollIndicator={false}
                                numColumns={numColumns}
                            />
                        </Block>
                    </Block>
                </BottomSheetScrollView>
            </BottomSheet>
            <ModalPoup visible={visibleCart}>
                <Block style={styles.clone}>
                    <Fontisto
                        name={'close-a'}
                        size={14}
                        color={'black'}
                        onPress={() => {
                            setVisibleCart(false);
                        }}
                    />
                </Block>
                <Block alignCenter={'center'}>
                    <Text fontType={'medium1'} style={styles.textOTP} center>
                        {t('askRemove')}
                    </Text>
                    <Block>
                        <Image
                            source={require('../../../../assets/icons/faile.png')}
                            style={{ width: 60, height: 60 }}
                        />
                    </Block>
                    <TouchableOpacity
                        style={styles.buttomAddCart}
                        onPress={() => {
                            dispatch(removeItem({ _id: idBookDelete.current })),
                                { setVisibleCart: setVisibleCart(false) };
                        }}>
                        <Text
                            fontType={'bold1'}
                            style={styles.textButtomLogin}
                            height={55}>
                            {t('delete')}
                        </Text>
                    </TouchableOpacity>
                </Block>
            </ModalPoup>
        </Container>
    );
};

const styles = StyleSheet.create({
    buttomAddCart: {
        width: '88%',
        height: 59,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: theme.colors.creamRed,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 6,

        elevation: 7,
    },
    textButtomLogin: {
        fontSize: 18,
        color: 'white',
    },
    clone: {
        alignItems: 'flex-end',
        marginRight: 10,
    },
    textOTP: {
        marginTop: 20,
        fontSize: 16,
        marginBottom: 20,
    },
    modalContainer: {
        width: '75%',
        backgroundColor: 'rgba(253,253,253,10)',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 30,
        borderColor: 'black',
    },
    modalBackGround: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    hide: {
        width: '16%',
        backgroundColor: '#D7DDE8',
        position: 'absolute',
        marginLeft: 88,
        bottom: 33,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    textBottom: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
    },
    Bottom: {
        marginLeft: '5%',
        marginTop: 20,
        height: 50,
        width: '90%',
        backgroundColor: theme.colors.lightRed,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,

        elevation: 17,
    },
    chap: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    FlatList1: {
        height: '100%',
        paddingBottom: 100,
    },
    ItemCart1: {
        width: '27%',
        height: 45,
        justifyContent: 'center',
        backgroundColor: '#CDCDCD',
        marginHorizontal: 10,
        marginVertical: 5,
        shadowColor: '#000',
        borderRadius: 5,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,

        elevation: 2,
    },
    Name: {
        lineHeight: 30,
    },
    Price: {
        marginTop: 10,
        fontSize: 20,
        color: '#D45555',
    },
    Container1: {
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    image1: {
        width: 100,
        height: 125,
        borderRadius: 5,
        borderWidth: 0.2,
        borderColor: 'gray',
    },
    CheckBox1: {
        width: 27,
        height: 27,
        alignItems: 'center',
        marginTop: 42,
        paddingBottom: 2,
    },
    CheckBox: {
        width: 27,
        height: 27,
        alignItems: 'center',
        marginTop: 42,
    },
    AllPay: {
        width: '100%',
        height: 80,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    Pay: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    TextName: {
        fontSize: 20,
    },
    TextPrice: {
        marginTop: 5,
        color: '#D45555',
        fontSize: 20,
    },
    BottomCheckOut: item => ({
        marginRight: 15,
        marginVertical: 10,
        flexDirection: 'row',
        height: 50,
        backgroundColor: item === 0 ? '#bdc3c7' : theme.colors.lightRed,
        borderRadius: 10,
        width: 160,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    }),
    BottomCheckOut1: {
        marginRight: 15,
        marginVertical: 10,
        flexDirection: 'row',
        marginLeft: 100,
        height: 50,
        backgroundColor: '#D45555',
        borderRadius: 10,
        width: 160,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 90,
        height: 120,
    },
    ContainerCheckOut: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ItemCart: {
        marginHorizontal: 10,
        paddingHorizontal: 15,
        marginVertical: 10,
        width: '95%',
        height: 140,
        borderRadius: 10,
        shadowColor: theme.colors.gray2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 11.14,

        elevation: 17,
    },
});
export default withNamespaces()(Cart);
