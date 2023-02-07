import { images } from '@assets';
import EmptyIcon from '@assets/svgs/EmptyIcon';
import { Block, Container, Icon, Text } from '@components';
import { routes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import {
    useLazyGetAllAuthorQuery,
    useLazyGetAllBookQuery,
    useLazyGetAllCategoryQuery,
    useLazyGetInforUserQuery,
} from '@redux/servicesNew';
import { height, width } from '@utils/responsive';
import { useAppSelector } from 'hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { withNamespaces } from 'react-i18next';
import {
    Animated,
    Image,
    LogBox,
    Platform,
    RefreshControl,
    ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { makeStyles, useTheme } from 'themeNew';
import HeaderHome from './components/HeaderHome';
import HeaderListBook from './components/HeaderListEvent';
import ItemAuthor from './components/ItemAuthor';
import ItemBookFree from './components/ItemBookFree';
import ItemCategory from './components/ItemCategory';
import ItemMostBookRead from './components/ItemMostBookRead';

LogBox.ignoreAllLogs();
const ITEM_WITH = width * 0.6;

const widthItemEventIncoming = width - width / 3;
const WIDTH_ITEM_INVIEW = widthItemEventIncoming - 20;

const HomeScreenMyAp = ({ t }) => {
    const myInfo = useAppSelector(state => state.root.auth);

    const [getAllBook] = useLazyGetAllBookQuery();
    const [getAllAuthor] = useLazyGetAllAuthorQuery();
    const [getAllCategory] = useLazyGetAllCategoryQuery();

    // useGetAllBookQuery();
    // useGetAllCategoryQuery();
    // useGetAllAuthorQuery();
    const navigation = useNavigation();

    const authors = useAppSelector(state => state.root.author.authors);

    const [isCollapsible, setIsCollapsible] = useState(true);
    const [bookFree, setBookFree] = useState([]);
    const [isRefresh, setRefresh] = useState(false);
    const [getInforUser] = useLazyGetInforUserQuery();

    const scrollX = React.useRef(new Animated.Value(0)).current;

    const allBooks = useAppSelector(state => state.root.book.bookList);
    const allCategories = useAppSelector(state => state.root.book.categoryList);
    const themeStore = useAppSelector(state => state.root.themeApp.theme);

    const theme = useTheme(themeStore);
    const styles = useStyle(themeStore);
    const inset = useSafeAreaInsets();

    useEffect(() => {
        getAllBook(myInfo.token);
        getAllAuthor(myInfo.token);
        getAllCategory(myInfo.token);
    }, []);

    useEffect(() => {
        if (allBooks) {
            let filterData = [];

            allBooks.forEach(item => {
                if (item.isPrice === 0) {
                    filterData.push(item);
                }
            });
            setBookFree(filterData);
        }
        getInforUser({ token: myInfo.token });
    }, [allBooks]);

    //Cập nhật mỗi lần thay đổi TabView

    const _renderItemMostBookRead = useCallback(
        ({ item, index }) => {
            return (
                <ItemMostBookRead
                    item={item}
                    index={index}
                    scrollX={scrollX}
                    size={allBooks}
                />
            );
        },
        [allBooks, scrollX],
    );

    const renderListMostRead = useCallback(() => {
        return (
            <Block height={height * 0.6}>
                <Animated.FlatList
                    data={allBooks}
                    keyExtractor={item => Math.random() + item._id}
                    renderItem={_renderItemMostBookRead}
                    decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
                    renderToHardwareTextureAndroid
                    contentContainerStyle={{ alignItems: 'center' }}
                    bounces={false}
                    removeClippedSubviews={false}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={ITEM_WITH}
                    snapToAlignment="start"
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false },
                    )}
                    scrollEventThrottle={16}
                    nestedScrollEnabled={true}
                    ListEmptyComponent={
                        <Block
                            width={width}
                            height={WIDTH_ITEM_INVIEW}
                            justifyCenter
                            alignCenter>
                            <EmptyIcon />
                        </Block>
                    }
                />
            </Block>
        );
    }, [_renderItemMostBookRead, allBooks, scrollX]);

    const renderListCategory = useCallback(() => {
        return (
            <Block>
                <HeaderListBook title={t('bookCategory')} />

                <Animated.FlatList
                    data={allCategories}
                    keyExtractor={item => Math.random() + item._id}
                    renderItem={item => <ItemCategory item={item} />}
                    bounces={true}
                    numColumns={4}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    nestedScrollEnabled={true}
                    ListEmptyComponent={
                        <Block
                            width={width}
                            height={WIDTH_ITEM_INVIEW}
                            justifyCenter
                            alignCenter>
                            <EmptyIcon />
                        </Block>
                    }
                />
            </Block>
        );
    }, [_renderItemMostBookRead, allCategories]);

    const renderListBookFree = useCallback(() => {
        return (
            <Block>
                <HeaderListBook
                    title={t('freeBook')}
                    action={() => {
                        navigation.navigate(routes.SEE_MORE);
                    }}
                />
                <Animated.FlatList
                    data={bookFree}
                    keyExtractor={item => Math.random() + item._id}
                    renderItem={item => <ItemBookFree item={item.item} />}
                    bounces={false}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    nestedScrollEnabled={true}
                    ListEmptyComponent={
                        <Block
                            marginTop={20}
                            width={width}
                            justifyCenter
                            alignCenter>
                            <EmptyIcon width={120} height={100} />
                        </Block>
                    }
                />
            </Block>
        );
    }, [_renderItemMostBookRead, bookFree, scrollX]);

    const renderListTopAuthor = useCallback(() => {
        return (
            <Block marginTop={15}>
                <HeaderListBook title={t('topAuthor')} />
                <Animated.FlatList
                    data={authors}
                    keyExtractor={item => item.toString()}
                    renderItem={item => <ItemAuthor item={item.item} />}
                    bounces={false}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    // scrollEventThrottle={16}
                    nestedScrollEnabled={true}
                    ListEmptyComponent={
                        <Block
                            marginTop={20}
                            width={width}
                            justifyCenter
                            alignCenter>
                            <EmptyIcon width={80} height={70} />
                        </Block>
                    }
                />
            </Block>
        );
    }, [_renderItemMostBookRead, authors, scrollX]);

    const renderSearch = () => {
        return (
            <Pressable
                onPress={() => navigation.navigate(routes.SEARCH)}
                style={[
                    styles.searchStyle,
                    { backgroundColor: theme.colors.text },
                ]}>
                <Text
                    fontType="regular1"
                    color={theme.colors.textInBox}
                    size={14}>
                    {t('searchHere')}
                </Text>
                <Icon
                    component="Ionicons"
                    name="ios-search-outline"
                    size={22}
                    color={theme.colors.textInBox}
                />
            </Pressable>
        );
    };

    return (
        <Container
            statusColor={theme.colors.background}
            edges={['left', 'right']}>
            {/* <Block flex> */}
            <HeaderHome
                name={myInfo?.name}
                image={myInfo?.image}
                setIsCollapsible={setIsCollapsible}
                isCollapsible={isCollapsible}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                style={{
                    backgroundColor: theme.colors.background,
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefresh}
                        onRefresh={async () => {
                            await getAllBook(myInfo.token);
                            await getAllAuthor(myInfo.token);
                            await getAllCategory(myInfo.token);
                            setRefresh(false);
                        }}
                    />
                }>
                <Block flex>
                    {renderSearch()}
                    <HeaderListBook title={t('mostViewedBooks')} />
                    {/* {Backdrop()} */}
                    {renderListMostRead()}
                    {renderListCategory()}
                    {renderListBookFree()}
                    {renderListTopAuthor()}
                    <Image source={images.banner} style={styles.banner} />
                </Block>
            </ScrollView>
            {/* </Block> */}
        </Container>
    );
};

const useStyle = makeStyles()(({ normalize, colors }) => ({
    linearGradient: {
        height: 200,
        width: width,
        position: 'absolute',
        bottom: 40,
    },
    banner: {
        width: '100%',
        height: 130,
        marginTop: 30,
    },
    searchStyle: {
        marginHorizontal: normalize(10)('moderate'),
        paddingHorizontal: normalize(15)('moderate'),
        borderRadius: normalize(15)('moderate'),
        height: normalize(50)('moderate'),
        justifyContent: 'space-between',
        flex: 1,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',

        shadowColor: colors.grey4,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.07,
        shadowRadius: 4.65,

        elevation: 8,
    },
}));

export default withNamespaces()(HomeScreenMyAp);
