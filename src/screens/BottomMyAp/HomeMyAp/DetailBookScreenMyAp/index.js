import { Block, HeaderWithButton, Icon } from '@components';
import {
    useAppDispatch,
    useAppSelector,
    useCountDown,
    useDebounce,
} from '@hooks';
import { useNavigation } from '@react-navigation/core';
import { changeTimeReducer } from '@redux/reducerNew';
import { timereadAPI, useGetAllChapterBookMutation } from '@redux/servicesNew';
import { theme } from '@theme';
import { makeStyles, useTheme } from 'themeNew';
import { CountUpTime } from '@utils/helper';
import CricleProgress from 'common/CircleProgress';
import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ToastAndroid,
} from 'react-native';
import ChapterBook from './components/ChapterBook';
import ImageBook from './components/ImageBook';
import IntroduceText from './components/IntroduceText';
import IconView from '@components/Icon';
import { usePostSaveFavoriteBooksMutation } from '@redux/servicesNew';
import { useGetFavoriteBookQuery } from '@redux/servicesNew';

const DetailBookScreenMyAp = ({ route }) => {
    const { bookmark, item, _isRead } = route.params;
    const [listChapters, setListChapters] = useState([]);
    const [isRead, setIsRead] = useState(_isRead || true);
    const [colorHeart, setColorHeart] = useState();
    const myInfo = useAppSelector(state => state.root.auth);
    const { data } = useGetFavoriteBookQuery({
        id: myInfo._id,
        token: myInfo.token,
    });

    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const themeNew = useTheme(themeStore);
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const [saveFavoriteBook] = usePostSaveFavoriteBooksMutation();
    const { progressInDay, target } = useAppSelector(
        state => state.root.reading,
    );
    const time = useCountDown(progressInDay, 100);

    useEffect(() => {
        dispatch(changeTimeReducer(time));
    }, [time]);

    // useEffect(() => {
    //     if (progressInDay && target) {
    //         const time = useCountdown(1, 15);
    //         console.log('===> time ', time);
    //     }
    // }, [target]);

    const [getAllChapterBook] = useGetAllChapterBookMutation();

    useEffect(() => {
        async function fetchAPI() {
            if (item._id) {
                const params = {
                    id: item._id,
                    token: myInfo.token,
                };
                const { data } = await getAllChapterBook(params);
                setListChapters(data);
            }
        }
        fetchAPI();
    }, [getAllChapterBook, item._id, myInfo._id]);

    const handleSaveFavoriteBook = async () => {
        try {
            setColorHeart(true);
            const body = {
                id: myInfo._id,
                idBook: item._id,
                token: myInfo.token,
            };
            await saveFavoriteBook(body);
            ToastAndroid.show('Đã thêm vào sách yêu thích', ToastAndroid.SHORT);
        } catch (error) {
            ToastAndroid.show('Lưu sách Không thành công', ToastAndroid.SHORT);
        }
    };

    useEffect(() => {
        dispatch(changeTimeReducer(time));
    }, [time]);

    // useEffect(() => {
    //     if (progressInDay && target) {
    //         const time = useCountdown(1, 15);
    //         console.log('===> time ', time);
    //     }
    // }, [target]);

    useEffect(() => {
        async function fetchAPI() {
            if (item._id) {
                const params = {
                    id: item._id,
                    token: myInfo.token,
                };
                const { data } = await getAllChapterBook(params);
                setListChapters(data);
            }
        }
        fetchAPI();
    }, [getAllChapterBook, item._id, myInfo._id]);

    useEffect(() => {
        let flg = false;
        try {
            data?.data[0]?.favoriteBooks.map(itemFvr => {
                if (itemFvr?.idBook._id == item?._id) {
                    flg = true;
                }
            });
            setColorHeart(flg);
        } catch (e) {
            console.log('[Error] getColorHeart ', e);
        }
    }, []);

    const favoriteIcon = () => {
        return (
            <TouchableOpacity onPress={handleSaveFavoriteBook}>
                <Block
                    style={styles.iconFavorite}
                    justifyCenter
                    width="100%"
                    paddingVertical={2}>
                    <IconView
                        component={'AntDesign'}
                        name={colorHeart ? 'heart' : 'hearto'}
                        size={25}
                        color={
                            colorHeart
                                ? themeNew.colors.primary
                                : themeNew.colors.textInBox
                        }
                    />
                </Block>
            </TouchableOpacity>
        );
    };

    return (
        <Block>
            <HeaderWithButton isBackHeader rightIcon={favoriteIcon()} />
            <ScrollView
                style={{ height: '100%' }}
                showsVerticalScrollIndicator={false}>
                <Block
                    flex
                    paddingHorizontal={20}
                    backgroundColor={themeNew.colors.background}>
                    <ImageBook item={route.params} />
                    <IntroduceText item={route.params} />
                    <ChapterBook
                        infoBook={item}
                        detailBook={listChapters}
                        nameBook={route.params.item.name}
                        isRead={isRead}
                        setIsRead={setIsRead}
                        navigation={navigation}
                    />
                </Block>
            </ScrollView>
        </Block>
    );
};

const styles = StyleSheet.create({
    animation: {
        width: 100,
        height: 100,
    },
    iconFavorite: {
        marginLeft: '50%',
    },
});

export default DetailBookScreenMyAp;
