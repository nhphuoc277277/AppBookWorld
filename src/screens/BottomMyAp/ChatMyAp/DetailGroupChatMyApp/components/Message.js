import { Block } from '@components';
import { useAppSelector } from '@hooks';
import { formatDate } from '@utils/helper';
import { width } from '@utils/responsive';
import { isEmpty } from 'lodash';
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import FastImage from 'react-native-fast-image';
import {
    FlingGestureHandler,
    Directions,
    State,
} from 'react-native-gesture-handler';
import Animated, {
    withSpring,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    useSharedValue,
} from 'react-native-reanimated';
import { useTheme } from 'themeNew';

const Message = ({
    createdAt,
    isLeft,
    message,
    onSwipe,
    name,
    image,
    avatar,
}) => {
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const { colors } = useTheme(themeStore);
    const startingPosition = 0;
    const x = useSharedValue(startingPosition);

    const isOnLeft = type => {
        if (isLeft && type === 'messageContainer') {
            return {
                // alignSelf: 'flex-start',
                backgroundColor: colors.white,
                borderTopLeftRadius: 0,
            };
        } else if (isLeft && type === 'message') {
            return {
                color: '#000',
            };
        } else if (isLeft && type === 'createdAt') {
            return {
                color: colors.grey6,
            };
        } else {
            return {
                borderTopRightRadius: 0,
            };
        }
    };

    const isOnLeftCotainer = type => {
        if (isLeft && type === 'messageContainer') {
            return {
                alignSelf: 'flex-start',
            };
        }
    };

    const isOnRight = type => {
        if (isLeft && type === 'messageContainer') {
            return {
                alignSelf: 'flex-start',
                backgroundColor: '#f0f0f0',
                borderTopLeftRadius: 0,
            };
        } else if (isLeft && type === 'message') {
            return {
                color: '#000',
            };
        } else if (isLeft && type === 'createdAt') {
            return {
                color: colors.grey6,
            };
        } else {
            return {
                borderTopRightRadius: 0,
            };
        }
    };

    const eventHandler = useAnimatedGestureHandler({
        onStart: (event, ctx) => {},
        onActive: (event, ctx) => {
            x.value = isLeft ? 50 : -50;
        },
        onEnd: (event, ctx) => {
            x.value = withSpring(startingPosition);
        },
    });

    const uas = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: x.value }],
        };
    });

    return (
        <FlingGestureHandler
            direction={isLeft ? Directions.RIGHT : Directions.LEFT}
            onGestureEvent={eventHandler}
            onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.state === State.ACTIVE) {
                    onSwipe(message, isLeft);
                }
            }}>
            <Animated.View style={[styles.container, uas]}>
                <Block style={isOnLeftCotainer('messageContainer')}>
                    <Text
                        style={[
                            styles.name,
                            isLeft
                                ? { alignSelf: 'flex-start' }
                                : { alignSelf: 'flex-end' },

                            isLeft ? { marginLeft: 60 } : { marginRight: 20 },
                        ]}>
                        {name}
                    </Text>
                    <View
                        style={[
                            styles.messageContainer,
                            { alignSelf: 'flex-end' },
                        ]}>
                        {avatar && (
                            <FastImage
                                source={{ uri: avatar }}
                                style={[
                                    {
                                        width: 30,
                                        height: 30,
                                        borderRadius: 100,
                                    },
                                ]}
                            />
                        )}
                        <View
                            style={[
                                styles.messageView,
                                isOnLeft('messageContainer'),
                                { marginLeft: 10 },
                            ]}>
                            {message ? (
                                <Text
                                    style={[
                                        styles.message,
                                        isOnLeft('message'),
                                    ]}>
                                    {message}
                                </Text>
                            ) : (
                                <Block style={styles.message} />
                            )}
                        </View>
                    </View>
                </Block>
                {image ? (
                    <Block
                        style={
                            isLeft
                                ? { alignSelf: 'flex-start', marginLeft: 60 }
                                : { alignSelf: 'flex-end', marginRight: 20 }
                        }>
                        <FastImage
                            source={{ uri: image }}
                            style={[
                                {
                                    width: 150,
                                    height: 200,
                                    borderRadius: 10,
                                },
                            ]}
                        />
                    </Block>
                ) : null}

                <View style={styles.timeView}>
                    <Text
                        style={[
                            styles.time,
                            isOnLeft('time'),
                            isLeft
                                ? { alignSelf: 'flex-start' }
                                : { alignSelf: 'flex-end' },
                        ]}>
                        {formatDate(new Date(createdAt))}
                    </Text>
                </View>
            </Animated.View>
        </FlingGestureHandler>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        marginVertical: 5,
    },
    messageContainer: {
        flexDirection: 'row',
        borderRadius: 15,
        marginHorizontal: 15,
        paddingTop: 5,
        paddingBottom: 10,
    },
    messageView: {
        backgroundColor: '#DD4455',
        maxWidth: '80%',
        borderRadius: 10,
        justifyContent: 'center',
    },
    timeView: {
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        // paddingLeft: 10,
    },
    message: {
        color: 'white',
        alignSelf: 'flex-start',
        fontSize: 15,
        marginHorizontal: 10,
        fontFamily: 'Lato-Medium',
    },
    time: {
        color: 'lightgray',
        fontSize: 10,
        paddingHorizontal: 20,
        paddingTop: 5,
    },
    name: {
        color: 'gray',
        fontSize: 12,
        paddingTop: 5,
        fontFamily: 'Lato-Medium',
    },
});

export default Message;
