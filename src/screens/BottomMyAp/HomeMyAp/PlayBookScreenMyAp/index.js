import { Block, Button, Container, HeaderWithButton, Text } from '@components';
import IconView from '@components/Icon';
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { useAppSelector } from '@hooks';
import {
    useCreateTimeReadMutation,
    useGetDetailChapterBookQuery,
} from '@redux/servicesNew';
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { Alert, BackHandler, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { useTheme } from 'themeNew';
import EvaluateBook from '../DetailBookScreenMyAp/components/EvaluateBook';

import { withNamespaces } from 'react-i18next';
const PlayBookScreenMyAp = ({ route, t }) => {
    const { dataInfoBook, idChapter } = route.params;
    const myInfo = useAppSelector(state => state.root.auth);
    const webref = useRef(null);
    const [themeBack, setThemeBack] = useState(true); //True background white
    const [size, setSize] = useState(16);
    const [colorHeart, setColorHeart] = useState();
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const theme = useTheme(themeStore);
    const inset = useSafeAreaInsets();
    const snapPoints = useMemo(() => [300 + inset.bottom], [inset.bottom]);
    const snapPoints2 = useMemo(() => [700 + inset.bottom], [inset.bottom]);
    const bottomSheetRef = useRef(null);
    const bottomSheetCommetnRef = useRef(null);
    var snapTI = -1;
    const [createTimeRead, { isLoading, data, error }] =
        useCreateTimeReadMutation();
    const dataFavorite = useAppSelector(state => state.root.book.favoriteList);
    const dataGet = useGetDetailChapterBookQuery({
        id: idChapter,
        token: myInfo.token,
    }).data;
    const timeStart = new Date();

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

    const renderRightIconHeader = () => (
        <Button
            style={{ marginRight: -25 }}
            onPress={() => bottomSheetRef.current?.snapToIndex(0)}>
            <IconView
                component={'Entypo'}
                name={'dots-three-vertical'}
                size={20}
                color={theme.colors.textInBox}
            />
        </Button>
    );

    const initailStyle = `
  document.body.style.marginLeft = '5%'
  document.body.style.marginRight = '5%' 
  document.querySelectorAll("p, div, td").forEach(item => {
    item.style.fontSize = "${size}px";
  });
  document.querySelectorAll("span").forEach(item => {
    item.style.display = "none";
  });
`;

    const backgroundWhite = `
  document.body.style.background = "${theme.colors.background}";
  document.querySelectorAll("p, div, td").forEach(item => {
    item.style.color = '${theme.colors.textInBox}';
  });`;

    const changeSize = `
    document.querySelectorAll("p, div, td").forEach(item => {
    item.style.fontSize = "${size}px";
  });`;

    useEffect(() => {
        if (dataGet) {
            setTimeout(() => {
                webref.current.injectJavaScript(backgroundWhite);
            }, 300);
        }
    }, [backgroundWhite, themeStore, dataGet]);

    useEffect(() => {
        if (webref.current) {
            webref.current.injectJavaScript(changeSize);
        }
    }, [changeSize, size, dataGet]);

    const endReadBook = async () => {
        const timeEnd = new Date();
        const sumTimeReadBook = Math.floor((timeEnd - timeStart) / 1000);
        const params = {
            time: sumTimeReadBook,
            token: myInfo.token,
        };

        const respon = await createTimeRead(params);
    };

    useEffect(() => {
        const backHandler = () => {
            Alert.alert('Hold on!', 'Are you sure you want to go back?', [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                {
                    text: 'YES',
                    onPress: () => {
                        BackHandler.exitApp();
                        endReadBook();
                    },
                },
            ]);
            return true;
        };
        const backHandlerEvent = BackHandler.addEventListener(
            'hardwareBackPress',
            backHandler,
        );
    }, []);

    const renderHtml = useCallback(() => {
        return (
            <WebView
                ref={webref}
                scalesPageToFit={false}
                injectedJavaScript={initailStyle}
                originWhitelist={['*']}
                source={{ html: dataGet?.htmlChapter }}
            />
        );
    }, [dataGet, initailStyle]);

    useEffect(() => {
        let flg = false;
        dataFavorite[0]?.favoriteBooks.map(itemFvr => {
            if (itemFvr?.idBook._id == dataInfoBook?._id) {
                flg = true;
            }
        });
        setColorHeart(flg);
    }, []);
    const handleSaveFavoriteBook = async () => {
        try {
            setColorHeart(true);
            const body = {
                id: myInfo._id,
                idBook: dataInfoBook._id,
                token: myInfo.token,
            };
            await saveFavoriteBook(body);
            ToastAndroid.show('Đã thêm vào sách yêu thích', ToastAndroid.SHORT);
        } catch (error) {
            ToastAndroid.show(
                'Chưa thêm vào sách yêu thích',
                ToastAndroid.SHORT,
            );
        }
    };

    return (
        <Container
            statusColor={theme.colors.background}
            edges={['left', 'right']}>
            <HeaderWithButton
                handleBack={endReadBook}
                title={dataGet?.title}
                isBackHeader
                rightIcon={renderRightIconHeader()}
            />
            {dataGet && renderHtml()}
            {/* {renderHtml()} */}
            <BottomSheet
                index={-1}
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                backdropComponent={renderBackdrop}>
                <Block
                    flex
                    backgroundColor={theme.colors.background}
                    borderWidth={!themeBack ? 1 : 0}
                    borderColor={
                        !themeBack ? theme.colors.white : theme.colors.red
                    }
                    paddingHorizontal={10}>
                    <Text
                        marginTop={10}
                        center
                        size={18}
                        fontType={'bold'}
                        color={theme.colors.grey4}>
                        {t('settings')}
                    </Text>
                    <Block
                        borderBottomWidth={1}
                        borderBottomColor={theme.colors.grey14}
                        marginTop={15}
                    />
                    <Button
                        onPress={handleSaveFavoriteBook}
                        row
                        style={[styles.rowModal]}>
                        <IconView
                            component={'AntDesign'}
                            name={true ? 'heart' : 'hearto'}
                            size={20}
                            color={
                                colorHeart
                                    ? theme.colors.primary
                                    : theme.colors.textInBox
                            }
                        />
                        <Text
                            style={styles.textRowModal}
                            color={
                                !themeBack
                                    ? theme.colors.white
                                    : theme.colors.dark2
                            }>
                            {colorHeart ? t('saved') : t('saveFavoriteBooks')}
                        </Text>
                    </Button>

                    <Button
                        row
                        style={[styles.rowModal]}
                        onPress={() => setSize(size - 2)}>
                        <IconView
                            component={'AntDesign'}
                            name={'minus'}
                            size={22}
                            color={theme.colors.textInBox}
                        />
                        <Text
                            style={styles.textRowModal}
                            color={
                                !themeBack
                                    ? theme.colors.white
                                    : theme.colors.dark2
                            }>
                            {t('increaseFontSize')}
                        </Text>
                    </Button>
                    <Button
                        row
                        style={[styles.rowModal]}
                        onPress={() => setSize(size + 2)}>
                        <IconView
                            component={'AntDesign'}
                            name={'plus'}
                            size={22}
                            color={theme.colors.textInBox}
                        />
                        <Text
                            style={styles.textRowModal}
                            color={
                                !themeBack
                                    ? theme.colors.white
                                    : theme.colors.dark2
                            }>
                            {t('reduceFontSize')}
                        </Text>
                    </Button>
                    <Button
                        row
                        style={[styles.rowModal]}
                        onPress={() =>
                            bottomSheetCommetnRef.current?.snapToIndex(0)
                        }>
                        <IconView
                            component={'EvilIcons'}
                            name={'comment'}
                            size={22}
                            color={theme.colors.textInBox}
                        />
                        <Text style={styles.textRowModal}>{t('comment')}</Text>
                    </Button>
                </Block>
            </BottomSheet>
            <BottomSheet
                index={-1}
                ref={bottomSheetCommetnRef}
                snapPoints={snapPoints2}
                enablePanDownToClose={true}
                backdropComponent={renderBackdrop}>
                <BottomSheetScrollView
                    backgroundColor={theme.colors.background}>
                    <EvaluateBook idChapter={idChapter} />
                </BottomSheetScrollView>
            </BottomSheet>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBack: {
        alignItems: 'center',
        justifyCenter: 'center',
        padding: 5,
    },
    textHeader: {
        fontSize: 16,
        color: 'white',
        marginRight: 10,
        flex: 1,
        fontWeight: 'bold',
    },
    containerModal: {
        alignItems: 'flex-end',
        paddingRight: 20,
    },
    rowModal: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    textRowModal: {
        fontSize: 15,
        marginLeft: 10,
    },
});

export default withNamespaces()(PlayBookScreenMyAp);
