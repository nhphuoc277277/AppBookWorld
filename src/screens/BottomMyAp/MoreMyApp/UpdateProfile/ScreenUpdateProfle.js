import {
    Image,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    ToastAndroid,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import React, { useState, useCallback, useMemo, useRef } from 'react';
import { Block, Text, HeaderWithButton } from '@components';
import IconView from '@components/Icon';
import { useAppSelector } from '@hooks';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEditProfileMutation } from '@redux/servicesNew/editProflieAPI';
import { colors, makeStyles, useTheme } from 'themeNew';
import { withNamespaces } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import { useLazyGetInforUserQuery } from '@redux/servicesNew';
import { isEmpty } from 'lodash';
import { icons } from '@assets';
const createFormData = (photo, name) => {
    const data = new FormData();
    data.append('file', photo.base64);
    data.append('name', name);
    return data;
};

const ScreenUpdateProfile = ({ t }) => {
    const myInfo = useAppSelector(state => state.root.auth);
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const theme = useTheme(themeStore);
    const styles = useStyle(themeStore);
    const [imageUri, setImageUri] = useState({ uri: myInfo.image });
    const [name, setName] = useState(myInfo?.name.trim());
    const [editProfile] = useEditProfileMutation();
    const inset = useSafeAreaInsets();
    const snapPoints = useMemo(() => [130 + inset.bottom], [inset.bottom]);
    const bottomSheetRef = useRef(null);
    var snapTI = -1;
    const navigaion = useNavigation();
    const [getInforUser] = useLazyGetInforUserQuery();

    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                {...props}
                enableTouchThrough={true}
                backgroundColor={theme.colors.black}
            />
        ),
        [],
    );

    const options = {
        saveToPhotos: true,
        mediaType: 'photo',
        maxWidth: 500,
        maxHeigth: 500,
        includeBase64: true,
    };

    const changBottomSheet = () => {
        if (snapTI == 0) {
            snapTI = -1;
            bottomSheetRef.current?.snapToIndex(snapTI);
        } else {
            snapTI = 0;
            bottomSheetRef.current?.snapToIndex(snapTI);
        }
    };

    const chooseImageGallary = async () => {
        // const result = await launchImageLibrary(options);
        // setImageUri(result.assets[0].uri);
        bottomSheetRef.current?.snapToIndex(-1);
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
            }); // console.log("takePhoto result =", result)

            if (snapTI == 0) {
                // snapTI = -1;
                bottomSheetRef.current?.snapToIndex(-1);
            }
        }
        bottomSheetRef.current.snapToIndex(-1);
    };

    const handleUploadPhoto = async () => {
        const body = {
            formData: createFormData(imageUri, name),
            token: myInfo.token,
        };
        const aw = await editProfile(body);

        if (aw?.data?.data) {
            await getInforUser({ token: myInfo.token });
            navigaion.goBack();

            ToastAndroid.show(
                'Update profile success',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
            );
        }
    };

    return (
        <Block flex backgroundColor={theme.colors.background}>
            <HeaderWithButton isBackHeader title={t('editProfile')} />
            <ScrollView>
                <Block
                    width={150}
                    marginTop={30}
                    marginBottom={50}
                    style={styles.container}
                    relative>
                    <Block
                        relative
                        backgroundColor={theme.colors.white}
                        width={150}
                        height={150}
                        radius={100}
                        justifyCenter
                        alignCenter
                        padding={7}>
                        <Block
                            backgroundColor={theme.colors.grey16}
                            width={155}
                            height={155}
                            radius={100}
                            justifyCenter
                            alignCenter
                            borderColor={theme.colors.grey10}
                            borderWidth={1.5}
                            padding={7}>
                            <Image
                                style={styles.avatar}
                                source={
                                    !isEmpty(imageUri?.uri)
                                        ? { uri: imageUri.uri }
                                        : icons.logo
                                }
                            />
                            <Block
                                absolute
                                width={40}
                                height={40}
                                radius={50}
                                backgroundColor={theme.colors.gray4}
                                justifyCenter
                                alignCenter
                                style={styles.blockIcon}>
                                <TouchableOpacity
                                    style={styles.iconPen}
                                    onPress={() =>
                                        bottomSheetRef.current?.snapToIndex(0)
                                    }>
                                    <IconView
                                        component={'MaterialIcons'}
                                        name={'add-a-photo'}
                                        size={25}
                                        color={theme.colors.grey6}
                                    />
                                </TouchableOpacity>
                            </Block>
                        </Block>
                    </Block>
                </Block>
                <Block width={'100%'} paddingHorizontal={15}>
                    <Block width={'100%'} marginTop={20}>
                        <Text
                            size={14}
                            fontType="medium1"
                            color={theme.colors.textInBox}
                            style={styles.textFullname}>
                            {t('fullName')}
                        </Text>
                        <TextInput
                            onChangeText={setName}
                            value={name}
                            color={theme.colors.textInBox}
                            placeholder={
                                isEmpty(myInfo.name) ? 'Username' : 'Username'
                            }
                            placeholderTextColor={theme.colors.grey10}
                            style={styles.textInput}
                        />
                    </Block>
                    <Block width={'100%'} marginTop={20}>
                        <Text
                            size={14}
                            fontType="medium1"
                            color={theme.colors.textInBox}
                            style={styles.textFullname}>
                            {t('birthDay')}
                        </Text>
                        <TextInput
                            placeholder={'dd/mm/yyyy'}
                            color={theme.colors.textInBox}
                            placeholderTextColor={theme.colors.grey10}
                            style={styles.textInput}
                        />
                    </Block>
                    <TouchableOpacity
                        onPress={handleUploadPhoto}
                        style={styles.TouchableOpacity}>
                        <Text
                            fontType="bold1"
                            style={styles.textSave}
                            height={55}>
                            {t('save')}
                        </Text>
                    </TouchableOpacity>
                </Block>
            </ScrollView>
            <BottomSheet
                style={styles.bottomSheet}
                index={-1}
                ref={bottomSheetRef}
                backdropComponent={renderBackdrop}
                snapPoints={snapPoints}
                enablePanDownToClose={true}>
                <Block
                    width={'100%'}
                    justifyCenter
                    alignCenter
                    height={'100%'}
                    backgroundColor={theme.colors.background}>
                    <TouchableOpacity
                        style={styles.buttomLogin}
                        onPress={() => takePhoto()}>
                        <Block width={35} alignCenter marginLeft={15}>
                            <IconView
                                component={'Ionicons'}
                                name={'camera-outline'}
                                size={25}
                                color={theme.colors.textInBox}
                            />
                        </Block>
                        <Text
                            color={theme.colors.textInBox}
                            style={styles.textButtomLogin}>
                            {t('takePhoto')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttomLogin}
                        onPress={() => chooseImageGallary()}>
                        <Block width={35} alignCenter marginLeft={15}>
                            <IconView
                                component={'FontAwesome'}
                                name={'picture-o'}
                                size={20}
                                color={theme.colors.textInBox}
                            />
                        </Block>
                        <Text
                            color={theme.colors.textInBox}
                            style={styles.textButtomLogin}>
                            {t('choosePhoto')}
                        </Text>
                    </TouchableOpacity>
                </Block>
            </BottomSheet>
        </Block>
    );
};

export default withNamespaces()(ScreenUpdateProfile);

const useStyle = makeStyles()(({ normalize, colors }) => ({
    iconPen: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.text,
        borderRadius: 50,
    },
    blockIcon: {
        top: '80%',
        left: '75%',
    },
    bottomSheet: {
        borderWidth: 1,
        borderColor: colors.grey6,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    textFullname: {
        marginLeft: 15,
    },
    textButtomLogin: {
        fontSize: 16,
        alignItems: 'center',
        marginLeft: 10,
    },
    buttomLogin: {
        width: '100%',
        height: '40%',
        marginLeft: '2%',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
    },
    textSave: {
        fontSize: 20,
        color: 'white',
    },
    TouchableOpacity: {
        width: '100%',
        height: 55,
        backgroundColor: colors.primary,
        borderRadius: 50,
        marginTop: '40%',
        marginBottom: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        fontWeight: '700',
        fontSize: 18,
        marginLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey6,
    },
    avatar: {
        width: 135,
        height: 135,
        borderRadius: 100,
        margin: 7,
    },
    container: {
        marginLeft: '33%',
    },
}));
