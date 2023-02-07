import { Block } from '@components';
import { useAppSelector } from '@hooks';
import { DOMAIN } from '@redux/servicesNew/endpoint';
import { theme } from '@theme';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import io from 'socket.io-client';
import Header from '../Header';
import ChatInput from './components/ChatInput';
import MessagesList from './components/MessageList';

const RoomChat = () => {
    const [clicked, setClicked] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState('');
    const socketRef = useRef();

    let saveSentMessage = '';

    const myInfo = useAppSelector(state => state.root.auth);

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // socketRef.current = io(DOMAIN);
        // socketRef.current.emit('add-user', myInfo._id);
    }, []);

    //👇🏻 Runs whenever there is new trigger from the backend

    const onSubmitHandler = _message => {
        setMessages([
            ...messages,
            { user: 0, time: new Date().toDateString(), content: _message.msg },
        ]);
        socketRef.current.emit('send-msg', _message);
    };

    useEffect(() => {
        socketRef.current.on('msg-recieve', msg => {
            setMessages([
                ...messages,
                { user: 1, time: new Date().toDateString(), content: msg },
            ]);
        });
    }, [socketRef, messages]);

    const [reply, setReply] = useState('');
    const [isLeft, setIsLeft] = useState();

    const swipeToReply = (message, isLeft) => {
        setReply(message.length > 50 ? message.slice(0, 50) + '...' : message);
        setIsLeft(isLeft);
    };

    const closeReply = () => {
        setReply('');
    };

    return (
        <Block flex paddingHorizontal={10} backgroundColor={theme.colors.white}>
            <Header
                clicked={clicked}
                setClicked={setClicked}
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
            />
            <MessagesList onSwipeToReply={swipeToReply} messages={messages} />
            <ChatInput onSubmitHandler={onSubmitHandler} />
            <TabChat />
        </Block>
    );
};

export default RoomChat;

const styles = StyleSheet.create({});
