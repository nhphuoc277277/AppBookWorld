import { useAppSelector } from '@hooks';
import React, { useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';
import { useTheme } from 'themeNew';

import Message from './Message';

const MessagesList = ({ onSwipeToReply, messages }) => {
    const user = useRef(0);
    const scrollView = useRef();
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const { colors } = useTheme(themeStore);

    useEffect(() => {
        if (scrollView.current) {
            scrollView.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    return (
        <ScrollView
            style={{ backgroundColor: colors.background, flex: 1 }}
            ref={ref => (scrollView.current = ref)}
            onContentChange={() => {
                scrollView.current.scrollToEnd({ animated: true });
            }}
            showsVerticalScrollIndicator={false}>
            {messages &&
                messages.map((message, index) => (
                    <Message
                        key={index}
                        createdAt={message.createdAt}
                        isLeft={!message.fromSelf}
                        message={message.message}
                        onSwipe={onSwipeToReply}
                        name={message?.name}
                        image={message?.image}
                        avatar={message?.avatar}
                    />
                ))}
        </ScrollView>
    );
};

export default MessagesList;
