import { Block, Container, Icon, Text } from '@components';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useAppSelector } from '@hooks';
import { useNavigation } from '@react-navigation/core';
import { useGetChatsMutation } from '@redux/servicesNew';
import { DOMAIN } from '@redux/servicesNew/endpoint';
import { isEmpty } from 'lodash';
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import io from 'socket.io-client';
import { useTheme } from 'themeNew';
import ChatInput from './components/ChatInput';
import MessagesList from './components/MessageList';

function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

const DetailGroupChatMyApp = ({ route }) => {
    const socketRef = useRef();
    const { id, image, name, users } = route.params;
    const [getChats, { isSuccess }] = useGetChatsMutation();
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const { colors } = useTheme(themeStore);
    const myInfo = useAppSelector(state => state.root.auth);
    const [messages, setMessages] = useState([]);
    const inset = useSafeAreaInsets();
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => [570 + inset.bottom], [inset.bottom]);

    const navigation = useNavigation();

    const processChange = debounce((image, msg, name, avatar) => {
        // let messageList = [
        //     ...messages,
        //     {
        //         user: 1,
        //         createdAt: new Date().toDateString(),
        //         message: msg,
        //         fromSelf: false,
        //         avatar: avatar,
        //         name: name,
        //         image: image ? image : undefined,
        //     },
        // ];
        // setMessages(messages);
    });

    useEffect(() => {
        const fetchApiChat = async () => {
            const { data } = await getChats({ token: myInfo.token, room: id });
            setMessages(data);
        };
        fetchApiChat();

        socketRef.current = io(DOMAIN);
        socketRef.current.emit('add-user', id);

        socketRef.current.on('msg-recieve', ({ msg, name, image, avatar }) => {
            // processChange(image, msg, name, avatar);
            console.log('msg-recieve ', msg, messages.length);
            let messageList = [
                ...messages,
                {
                    user: 1,
                    createdAt: new Date().toDateString(),
                    message: msg,
                    fromSelf: false,
                    avatar: avatar,
                    name: name,
                    image: image ? image : undefined,
                },
            ];
            if (messageList.length > 0) {
                setMessages(messageList);
            }
        });
    }, []);

    // useEffect(() => {

    // }, []);

    //👇🏻 Runs whenever there is new trigger from the backend

    const onSubmitHandler = _message => {
        // console.log('onSubmitHandler ', _message);
        setMessages([
            ...messages,
            {
                user: 0,
                createdAt: new Date(),
                message: _message.msg,
                fromSelf: true,
                avatar: myInfo.image,
                name: myInfo.name,
                image: _message?.file
                    ? `data:image/jpeg;base64,${_message?.file}`
                    : undefined,
            },
        ]);

        socketRef.current.emit('send-msg', {
            ..._message,
            name: myInfo.name,
            avatar: myInfo.image,
        });
    };

    useEffect(() => {
        // socketRef.current.on('msg-recieve', ({ msg, name, image }) => {
        //     console.log('msg-recieve ', image);
        //     setMessages([
        //         ...messages,
        //         {
        //             user: 1,
        //             createdAt: new Date().toDateString(),
        //             message: msg,
        //             fromSelf: false,
        //             avatar: image,
        //             name: name,
        //             image: image ? image : undefined,
        //         },
        //     ]);
        // });
    }, [socketRef]);

    const [reply, setReply] = useState('');
    const [isLeft, setIsLeft] = useState();

    const swipeToReply = (message, isLeft) => {
        setReply(message.length > 50 ? message.slice(0, 50) + '...' : message);
        setIsLeft(isLeft);
    };

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
            <Block
                backgroundColor={colors.background}
                paddingHorizontal={10}
                alignCenter
                flex>
                <Text
                    marginVertical={10}
                    size={16}
                    fontType="bold1"
                    color={colors.textInBox}>
                    Thông tin nhóm
                </Text>
                <Block
                    width="100%"
                    alignCenter
                    borderTopWidth={3}
                    borderColor={colors.text}
                    paddingVertical={10}>
                    <Image source={{ uri: image }} style={styles.imageRoom} />
                    <Block row alignCenter>
                        <Text
                            marginRight={10}
                            marginTop={10}
                            size={20}
                            fontType="bold1"
                            color={colors.textInBox}>
                            {name}
                        </Text>
                        <Icon
                            component="Feather"
                            name="edit-3"
                            color={colors.textInBox}
                            size={20}
                        />
                    </Block>
                    <Block
                        row
                        width="90%"
                        paddingVertical={20}
                        borderBottomWidth={2}
                        borderColor={colors.text}
                        justifyCenter>
                        <Block alignCenter>
                            <Block
                                height={40}
                                width={40}
                                backgroundColor={colors.grey14}
                                radius={40}
                                alignCenter
                                justifyCenter>
                                <Icon
                                    component="Ionicons"
                                    name="notifications-outline"
                                    color={colors.grey4}
                                    size={25}
                                />
                            </Block>
                            <Text
                                marginTop={5}
                                size={12}
                                style={{ width: 80, textAlign: 'center' }}
                                color={colors.textInBox}>
                                Tắt thông báo
                            </Text>
                        </Block>
                        <Block alignCenter>
                            <Block
                                height={40}
                                width={40}
                                backgroundColor={colors.grey14}
                                radius={40}
                                alignCenter
                                justifyCenter>
                                <Icon
                                    component="Ionicons"
                                    name="ios-attach"
                                    color={colors.text}
                                    size={25}
                                />
                            </Block>
                            <Text
                                marginTop={5}
                                size={12}
                                style={{ width: 80, textAlign: 'center' }}
                                color={colors.textInBox}>
                                Tin ghim
                            </Text>
                        </Block>
                        <Block alignCenter>
                            <Block
                                height={40}
                                width={40}
                                backgroundColor={colors.grey14}
                                radius={40}
                                alignCenter
                                justifyCenter>
                                <Icon
                                    component="Ionicons"
                                    name="ios-person-add-outline"
                                    color={colors.grey4}
                                    size={25}
                                />
                            </Block>
                            <Text
                                marginTop={5}
                                size={12}
                                style={{ width: 80, textAlign: 'center' }}
                                color={colors.textInBox}>
                                Tắt thông báo
                            </Text>
                        </Block>
                        <Block alignCenter>
                            <Block
                                height={40}
                                width={40}
                                backgroundColor={colors.grey14}
                                radius={40}
                                alignCenter
                                justifyCenter>
                                <Icon
                                    component="Ionicons"
                                    name="settings-outline"
                                    color={colors.grey4}
                                    size={25}
                                />
                            </Block>
                            <Text
                                marginTop={5}
                                size={12}
                                style={{ width: 80, textAlign: 'center' }}
                                color={colors.textInBox}>
                                Cài đặt
                            </Text>
                        </Block>
                    </Block>
                    <Block
                        width="90%"
                        paddingVertical={20}
                        borderBottomWidth={2}
                        borderColor={colors.text}>
                        <Text
                            size={16}
                            fontType="bold"
                            color={colors.textInBox}>
                            Thành viên nhóm
                        </Text>

                        <Block row alignCenter paddingVertical={5}>
                            <Icon
                                component="Ionicons"
                                name="people-outline"
                                color={colors.textInBox}
                                size={25}
                            />
                            <Text
                                marginLeft={10}
                                size={16}
                                color={colors.textInBox}>
                                {users.length} thành viên
                            </Text>
                        </Block>
                    </Block>
                    <Block width="90%" paddingVertical={20}>
                        <Text
                            size={16}
                            fontType="bold"
                            color={colors.textInBox}>
                            Thiết lập và bảo mật
                        </Text>

                        <Block row alignCenter paddingVertical={5}>
                            <Icon
                                component="Ionicons"
                                name="eye-off-outline"
                                color={colors.textInBox}
                                size={25}
                            />
                            <Text
                                marginLeft={10}
                                size={16}
                                color={colors.textInBox}>
                                {users.length} ẩn trò chuyện
                            </Text>
                        </Block>
                        <Block row alignCenter paddingVertical={5}>
                            <Icon
                                component="Ionicons"
                                name="warning-outline"
                                color={colors.textInBox}
                                size={25}
                            />
                            <Text
                                marginLeft={10}
                                size={16}
                                color={colors.textInBox}>
                                Báo cáo
                            </Text>
                        </Block>
                        <Block
                            marginLeft={-5}
                            row
                            alignCenter
                            paddingVertical={5}>
                            <Icon
                                component="MaterialCommunityIcons"
                                name="delete-empty-outline"
                                color={colors.primary}
                                size={27}
                            />
                            <Text
                                marginLeft={10}
                                size={16}
                                color={colors.primary}>
                                Xoá lịch sử trò chuyện
                            </Text>
                        </Block>
                        <Block row alignCenter paddingVertical={5}>
                            <Icon
                                component="Feather"
                                name="log-out"
                                color={colors.primary}
                                size={20}
                            />
                            <Text
                                marginLeft={10}
                                size={16}
                                color={colors.primary}>
                                Rời khỏi nhóm
                            </Text>
                        </Block>
                    </Block>
                </Block>
            </Block>
        </BottomSheet>
    );

    return (
        <Container
            style={{ backgroundColor: colors.background }}
            statusColor={colors.background}>
            <Block
                marginTop={40}
                borderBottomWidth={2}
                borderColor={colors.text}
                row
                paddingVertical={10}
                alignCenter
                paddingHorizontal={10}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon
                        component="MaterialIcons"
                        name="arrow-back-ios"
                        size={20}
                        color={colors.textDark}
                    />
                </TouchableOpacity>
                <Image source={{ uri: image }} style={styles.imageRoom} />
                <Block flex>
                    <Text
                        marginLeft={10}
                        size={18}
                        fontType="bold"
                        color={colors.textDark}>
                        {name}
                    </Text>
                    <Text marginLeft={10} size={14} color={colors.textDark}>
                        Giới thiệu
                    </Text>
                </Block>
                <TouchableOpacity
                    onPress={() => bottomSheetRef.current?.snapToIndex(0)}>
                    <Icon
                        component="Ionicons"
                        name="ios-information-circle-outline"
                        color={colors.textDark}
                        size={30}
                    />
                </TouchableOpacity>
            </Block>
            <MessagesList onSwipeToReply={swipeToReply} messages={messages} />
            <ChatInput onSubmitHandler={onSubmitHandler} id={id} />
            {bottomSheetInfo()}
        </Container>
    );
};

export default DetailGroupChatMyApp;

const styles = StyleSheet.create({
    imageRoom: {
        height: 50,
        width: 50,
        borderRadius: 100,
    },
});
