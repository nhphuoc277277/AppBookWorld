import { icons } from '@assets';
import { Block, Container, Icon, Text, TextInput } from '@components';
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { useAppSelector, useDebounce } from '@hooks';
import { routes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/core';
import {
    useCreateGroupMutation,
    useGetAllAccountQuery,
    useLazyGetRoomChatQuery,
} from '@redux/servicesNew';
import { CustomToast } from '@utils/helper';
import { height, width } from '@utils/responsive';
import { isEmpty } from 'lodash';
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { withNamespaces } from 'react-i18next';
import {
    FlatList,
    Image,
    PermissionsAndroid,
    Pressable,
    TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { makeStyles, useTheme } from 'themeNew';
const handleKeyExtractor = item => item.toString();

const createFormData = (photo, name, users) => {
    const data = new FormData();
    data.append('file', photo.base64);
    data.append('name', name);
    data.append('users', JSON.stringify(users));
    return data;
};

const ChatScreenMyApp = ({ t }) => {
    const myInfo = useAppSelector(state => state.root.auth);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [getRoomChat, { isSuccess, error }] = useLazyGetRoomChatQuery();
    const { data: allAccount } = useGetAllAccountQuery({ token: myInfo.token });
    const [imageUri, setImageUri] = useState({});
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const { colors } = useTheme(themeStore);
    const styles = useStyle(themeStore);
    const navigation = useNavigation();
    const bottomSheetRef = useRef();
    const bottomSheetPhotoRef = useRef();
    const inset = useSafeAreaInsets();
    const snapPoints = useMemo(
        () => [height - 200 + inset.bottom],
        [inset.bottom],
    );
    const snapPointsPhoto = useMemo(() => [150], [inset.bottom]);
    const [peopleSearch, setPeopleSearch] = useState([]);
    const [peoplesChoose, setPeopleChoose] = useState({});
    const [searchText, setSearchText] = useState('');
    const [nameGroup, setNameGroup] = useState('');
    const [dataGroups, setDataGroups] = useState([]);
    const [isRefresh, setRefresh] = useState(false);

    const [createGroup] = useCreateGroupMutation();

    useEffect(() => {
        const fetchGetGroups = async () => {
            let { data } = await getRoomChat(myInfo.token);

            let reversedData = [];
            data.forEach(item => reversedData.unshift(item));
            setDataGroups(reversedData);
        };
        fetchGetGroups();
    }, []);

    const searchDebounce = useDebounce(searchText, 300);

    useEffect(() => {
        if (allAccount?.data) {
            const findPeople = allAccount?.data.filter(item =>
                item.name.includes(searchDebounce),
            );
            setPeopleSearch(findPeople);
        }
    }, [searchDebounce]);

    const renderItemChat = useCallback(
        ({ item }) => {
            return (
                <Pressable
                    onPress={() =>
                        navigation.navigate(routes.DETAIL_GROUP_CHAT_MY_APP, {
                            id: item._id,
                            image: item.image,
                            name: item.name,
                            users: item.users,
                        })
                    }>
                    <Block row alignCenter>
                        <FastImage
                            style={styles.imageGroup}
                            source={
                                !isEmpty(item.image)
                                    ? { uri: item.image }
                                    : icons.logo
                            }
                        />
                        <Block marginLeft={10} flex>
                            <Text
                                color={colors.textInBox}
                                size={14}
                                fontType="bold">
                                {item.name}
                            </Text>
                            <Text color={colors.textInBox}>
                                {item.description}
                            </Text>
                        </Block>
                        <Block>
                            <Text color={colors.textInBox} size={10}>
                                12:40
                            </Text>
                        </Block>
                    </Block>
                </Pressable>
            );
        },
        [colors],
    );

    const searchIcon = () => (
        <Icon
            component="Ionicons"
            name="ios-search-outline"
            size={22}
            color={colors.textInBox}
        />
    );

    const renderSpace = () => (
        <Block height={20} justifyCenter>
            <Block height={2} backgroundColor={colors.text}></Block>
        </Block>
    );

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

    const bottomSheetInfo = () => (
        <BottomSheet
            index={-1}
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            backdropComponent={renderBackdrop}>
            <BottomSheetScrollView>
                <Block
                    backgroundColor={colors.background}
                    paddingHorizontal={10}
                    alignCenter
                    flex>
                    <Text
                        fontType={'bold1'}
                        color={colors.textInBox}
                        marginVertical={10}
                        size={16}>
                        {t('createNewGroup')}
                    </Text>
                    <Block
                        flex
                        width="100%"
                        alignCenter
                        borderTopWidth={3}
                        borderColor={colors.grey16}
                        paddingVertical={10}>
                        <TouchableOpacity
                            onPress={() => {
                                bottomSheetPhotoRef.current.snapToIndex(0);
                            }}
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            {isEmpty(imageUri) ? (
                                <Icon
                                    component="Ionicons"
                                    name="ios-person-circle-outline"
                                    size={100}
                                    color={colors.textInBox}
                                />
                            ) : (
                                <Image
                                    style={styles.imageNewGroup}
                                    source={{ uri: imageUri?.uri }}
                                />
                            )}
                            <Block row alignCenter marginTop={5}>
                                <Icon
                                    component="Feather"
                                    name="edit-3"
                                    color={colors.textInBox}
                                    size={20}
                                />
                            </Block>
                        </TouchableOpacity>

                        <Block width="90%" paddingVertical={10}>
                            <Text
                                color={colors.textInBox}
                                marginBottom={-20}
                                size={16}
                                fontType="bold1">
                                {t('groupName')}
                            </Text>

                            <TextInput
                                value={nameGroup}
                                onChangeText={setNameGroup}
                                placeholder={t('enterGroupName')}
                                style={styles.containerSearch}
                            />
                        </Block>
                        <Block width="90%">
                            <Text
                                color={colors.textInBox}
                                marginBottom={-20}
                                size={16}
                                fontType="bold1">
                                {t('addMember')}
                            </Text>

                            <TextInput
                                placeholder={t('enterInfo')}
                                style={styles.containerSearch}
                                onChangeText={setSearchText}
                                value={searchText}
                            />
                        </Block>

                        <BottomSheetScrollView
                            style={{
                                width: width,
                                paddingHorizontal: 30,
                                marginTop: 10,
                                height: 300,
                            }}>
                            {peopleSearch.map(item => (
                                <TouchableOpacity
                                    onPress={() => {
                                        if (peoplesChoose[item._id]) {
                                            setPeopleChoose({
                                                ...peoplesChoose,
                                                [item._id]: false,
                                            });
                                        } else {
                                            setPeopleChoose({
                                                ...peoplesChoose,
                                                [item._id]: true,
                                            });
                                        }
                                    }}>
                                    <Block
                                        borderColor={
                                            peoplesChoose[item._id]
                                                ? colors.green
                                                : colors.white
                                        }
                                        borderWidth={2}
                                        radius={15}
                                        row
                                        padding={10}
                                        marginVertical={5}
                                        alignCenter
                                        flex>
                                        <Image
                                            source={{ uri: item.image }}
                                            style={styles.imagePeople}
                                        />
                                        <Text
                                            color={colors.textInBox}
                                            flex
                                            marginLeft={10}>
                                            {item.name}
                                        </Text>

                                        {peoplesChoose[item._id] && (
                                            <Icon
                                                component="AntDesign"
                                                name="checkcircleo"
                                                color={colors.green}
                                                size={20}
                                            />
                                        )}
                                    </Block>
                                </TouchableOpacity>
                            ))}
                        </BottomSheetScrollView>
                    </Block>
                    <TouchableOpacity
                        onPress={async () => {
                            handleUploadPhoto();
                        }}>
                        <Block
                            width={width * 0.85}
                            height={50}
                            justifyCenter
                            alignCenter
                            backgroundColor={colors.primary}
                            radius={10}>
                            <Text fontType={'bold1'} color={colors.white}>
                                {t('createGroup')}
                            </Text>
                        </Block>
                    </TouchableOpacity>
                </Block>
            </BottomSheetScrollView>
        </BottomSheet>
    );

    const renderGroup = useCallback(() => {
        return (
            <FlatList
                data={dataGroups}
                keyExtractor={handleKeyExtractor}
                renderItem={renderItemChat}
                ItemSeparatorComponent={renderSpace}
                showsVerticalScrollIndicator={false}
                refreshing={isRefresh}
                onRefresh={async () => {
                    setRefresh(true);
                    let { data } = await getRoomChat(myInfo.token);
                    setRefresh(false);
                    let reversedData = [];
                    data.forEach(item => reversedData.unshift(item));
                    setDataGroups(reversedData);
                }}
            />
        );
    }, [dataGroups]);

    const options = {
        saveToPhotos: true,
        mediaType: 'photo',
        maxWidth: 500,
        maxHeigth: 500,
        includeBase64: true,
    };

    const chooseImageGallary = async () => {
        // const result = await launchImageLibrary(options);
        // setImageUri(result.assets[0].uri);
        bottomSheetPhotoRef.current?.close();
        const result = await launchImageLibrary(options);
        setImageUri({
            uri: result.assets[0].uri,
            name: result.assets[0].fileName,
            type: result.assets[0].type,
            base64: result.assets[0].base64,
        });
    };

    const takePhoto = async () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // const result = await launchCamera(options)
            // setImageUri(result.assets[0].uri);
            // setImageUri({ uri: result.assets[0].uri, name: result.assets[0].fileName, type: result.assets[0].type });
            const result = await launchCamera(options);
            // setImageUri({ uri: result.assets[0].uri, name: result.assets[0].fileName, type: result.assets[0].type });
            setImageUri({
                uri: result.assets[0].uri,
                name: result.assets[0].fileName,
                type: result.assets[0].type,
                base64: result.assets[0].base64,
            });

            if (snapTI == 0) {
                // snapTI = -1;
                bottomSheetPhotoRef.current?.close();
            }
        }
        bottomSheetPhotoRef.current?.close();
    };

    const handleUploadPhoto = async () => {
        const body = {
            formData: createFormData(imageUri, nameGroup, [
                ...Object.keys(peoplesChoose),
                myInfo._id,
            ]),
            token: myInfo.token,
        };

        const aw = await createGroup(body);

        if (aw?.data?.data) {
            CustomToast(`Create ${name} success`);

            bottomSheetRef.current?.close();
        }
    };

    return (
        <Container style={styles.root} statusColor={colors.background}>
            <Block
                flex
                paddingHorizontal={20}
                backgroundColor={colors.background}>
                <Block row alignCenter marginTop={10}>
                    <Text
                        flex
                        size={28}
                        fontType="bold1"
                        color={colors.primary}>
                        Explore
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            bottomSheetRef.current.snapToIndex(0);
                            setSearchText('');
                            setPeopleSearch([]);
                        }}>
                        <Block
                            height={30}
                            width={30}
                            borderColor={colors.textInBox}
                            borderWidth={2}
                            radius={6}
                            justifyCenter
                            alignCenter>
                            <Icon
                                component="Ionicons"
                                name="md-add"
                                color={colors.textInBox}
                                size={25}
                            />
                        </Block>
                    </TouchableOpacity>
                </Block>

                <Block marginBottom={15}>
                    <TextInput
                        value={searchPhrase}
                        onChangeText={setSearchPhrase}
                        placeholder="Search by name..."
                        iconLeft={searchIcon}
                        style={styles.containerSearch}
                    />
                </Block>

                {renderGroup()}
                {bottomSheetInfo()}
                <BottomSheet
                    style={styles.bottomSheet}
                    index={-1}
                    ref={bottomSheetPhotoRef}
                    backdropComponent={renderBackdrop}
                    snapPoints={snapPointsPhoto}
                    enablePanDownToClose={true}>
                    <Block
                        width={'100%'}
                        justifyCenter
                        height={'100%'}
                        backgroundColor={colors.background}>
                        <TouchableOpacity
                            style={styles.buttomLogin}
                            onPress={() => takePhoto()}>
                            <Block justifyCenter row>
                                <Block
                                    width={35}
                                    alignCenter
                                    marginLeft={15}
                                    backgroundColor={colors.grey12}
                                    radius={100}
                                    height={36}
                                    justifyCenter>
                                    <Icon
                                        component={'Ionicons'}
                                        name={'camera-outline'}
                                        size={22}
                                        color={colors.grey6}
                                    />
                                </Block>
                                <Text
                                    color={colors.textInBox}
                                    style={styles.textButtomLogin}>
                                    {t('takePhoto')}
                                </Text>
                            </Block>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttomLogin}
                            onPress={() => chooseImageGallary()}>
                            <Block
                                width={35}
                                alignCenter
                                marginLeft={15}
                                backgroundColor={colors.grey12}
                                radius={100}
                                height={36}
                                justifyCenter>
                                <Icon
                                    component={'FontAwesome'}
                                    name={'picture-o'}
                                    size={17}
                                    color={colors.grey6}
                                />
                            </Block>
                            <Text
                                color={colors.textInBox}
                                style={styles.textButtomLogin}>
                                {t('choosePhoto')}
                            </Text>
                        </TouchableOpacity>
                    </Block>
                </BottomSheet>
            </Block>
        </Container>
    );
};

export default withNamespaces()(ChatScreenMyApp);

const useStyle = makeStyles()(({ normalize, colors }) => ({
    imageGroup: {
        height: normalize(50)('moderate'),
        width: normalize(50)('moderate'),
        borderRadius: normalize(100)('moderate'),
    },
    root: {
        backgroundColor: colors.white,
    },
    containerSearch: {
        height: normalize(45)('moderate'),
    },
    imagePeople: {
        height: 40,
        width: 40,
        borderRadius: 10,
    },
    bottomSheet: {
        borderWidth: 1,
        borderColor: colors.grey6,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    imageNewGroup: {
        width: 90,
        height: 90,
        borderRadius: 100,
    },
    buttomLogin: {
        width: '100%',
        flexDirection: 'row',
        borderRadius: 10,
        alignContent: 'center',
        marginTop: 10,
    },
    textButtomLogin: {
        fontSize: 16,
        marginLeft: 10,
        fontFamily: 'Lato-Regular',
        textAlign: 'center',
        height: 20,
        alignSelf: 'center',
        justifyContent: 'center',
    },
}));
