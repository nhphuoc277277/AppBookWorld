import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import actions from '@redux/actions';
// import { bottom } from '@screens/Bottom';
import React, { useState } from 'react';
import { bottom } from '../screens/BottomMyAp';
import CustomTabar from './CustomTabar';
// import {useDispatch, useSelector} from 'react-redux';
import IconView from '@components/Icon';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from '@theme';
import { StyleSheet, View } from 'react-native';
import { routes } from './routes';

const Stack = createStackNavigator();

const screenOptionStyle = {
    headerShown: false,
};
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container_icon: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
    },
});

const activeHome = isPlay => {
    return (
        <View
            style={[
                styles.container_icon,
                {
                    backgroundColor: isPlay
                        ? theme.colors.red
                        : theme.colors.gray4,
                },
            ]}>
            <IconView
                component={'MaterialIcons'}
                name={'home'}
                size={25}
                color={isPlay ? 'white' : 'black'}
            />
        </View>
    );
};

const tabData = [
    {
        name: 'Nhà',
        activeIcon: activeHome(true),
        inactiveIcon: activeHome(false),
        key: 1,
    },
];
const BottomTabMyAp = () => {
    // useEffect(() => {
    //   I18nManage.forceRTL(true);
    // }, []);

    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            tabBar={props => <CustomTabar {...props} />}>
            <Tab.Screen
                name={routes.HOME_MY_AP}
                component={bottom.HOME_MY_AP}
                options={{
                    tabBarLabel: 'Trang chủ',
                    tabBarIcon: 'home',
                    component: 'AntDesign',
                }}
            />

            <Tab.Screen
                name={routes.READING_MY_APP}
                component={bottom.READING_MY_APP}
                options={{
                    tabBarLabel: 'Đang đọc',
                    tabBarIcon: 'book-open-variant',
                    component: 'MaterialCommunityIcons',
                }}
            />

            <Tab.Screen
                name={routes.CART_MY_AP}
                component={bottom.CART_MY_AP}
                options={{
                    tabBarLabel: 'Giỏ hàng',
                    tabBarIcon: 'shopping-cart',
                    tabBarStyle: { display: 'none' },
                    component: 'Feather',
                }}
            />

            <Tab.Screen
                name={routes.CHAT_MY_AP}
                component={bottom.CHAT_MY_AP}
                options={{
                    tabBarLabel: 'Nhắn tin',
                    tabBarIcon: 'chat',
                    tabBarStyle: { display: 'none' },
                    component: 'MaterialIcons',
                }}
            />

            <Tab.Screen
                name={routes.MORE_MY_APP}
                component={bottom.MORE_MY_APP}
                options={{
                    tabBarLabel: 'Cài đặt',
                    tabBarIcon: 'ios-settings-outline',
                    component: 'Ionicons',
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabMyAp;
