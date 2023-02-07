import { Block, Text } from '@components';
import React, { memo, useRef } from 'react';
import { Animated, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import IconView from '@components/Icon';
// import {useDispatch, useSelector} from 'react-redux';
import { theme } from '../theme';
import { useAppSelector } from '@hooks';
import { useTheme } from 'themeNew';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PADDING_BOTTOM = Platform.OS === 'ios' ? 20 : 0;
const { colors } = theme;
const CustomTabBar = ({ state, descriptors, navigation }) => {
    const scaleBotTabBar = useRef(new Animated.Value(0.5)).current;
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const inset = useSafeAreaInsets();

    const { colors } = useTheme(themeStore);

    const scaleOut = () => {
        Animated.timing(scaleBotTabBar, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
        }).start();
    };
    return (
        <Block
            paddingVertical={10}
            paddingBottom={inset.bottom}
            flexDirection="row"
            backgroundColor={colors.background}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;
                const isFocused = state.index === index;
                if (isFocused) {
                    scaleOut();
                }
                const iconName =
                    options.tabBarIcon !== undefined
                        ? options.tabBarIcon
                        : 'home';
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };
                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };
                const color = isFocused ? colors.primary : colors.textInBox;
                const flex = isFocused ? 2.5 : 2.5;

                return (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.container,
                            {
                                transform: [
                                    isFocused
                                        ? { scaleX: scaleBotTabBar }
                                        : { scale: 1 },
                                ],
                                flex,
                            },
                        ]}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}>
                        <Block style={[styles.bottomTabSection]}>
                            <IconView
                                component={options.component}
                                color={color}
                                size={20}
                                name={iconName}
                            />
                        </Block>
                    </TouchableOpacity>
                );
            })}
        </Block>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        borderRadius: 15,
        padding: 5,
        flex: 1,
        marginHorizontal: 20,
        // paddingBottom: PADDING_BOTTOM,
    },
    bottomTabSection: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default memo(CustomTabBar);
