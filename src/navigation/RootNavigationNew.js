import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import { bottom } from '@screens/BottomMyAp';
import { useAppSelector } from '@hooks';

import CustomTabar from './CustomTabar';
import { routes } from './routes';
import SplashScreen from 'react-native-splash-screen';
import Register from '@screens/Auth/Register';
import Login from '@screens/Auth/Login';
import Welcome from '@screens/Auth/Welcome';
import {
    BooksByCategory,
    DetailBookScreenMyAp,
    // ListenBook,
    Payment,
    PlayBookScreenMyAp,
    ScreenNotification,
    Search,
} from '@screens/BottomMyAp/HomeMyAp';
import ListenBook from '@screens/BottomMyAp/HomeMyAp/ListenBook';
import { DetailCart, PaymentMethods } from '@screens/BottomMyAp/CartMyAp';
import { DetailGroupChatMyApp } from '@screens/BottomMyAp/ChatMyAp';
import SeeMoreScreen from '@screens/BottomMyAp/HomeMyAp/HomeScreenMyAp/components/SeeMoreScreen';
import {
    EditMoreMyApp,
    ScreenChangeLanguage,
    ScreenPurchaseHistory,
    ScreenThemeMode,
    ScreenUpdateProfile,
} from '@screens/BottomMyAp/MoreMyApp';
import { DetailAuthor } from '@screens/BottomMyAp/ReadingMyAp';
import { StatusBar } from 'react-native';
import { theme } from '@theme';
import { useTheme } from 'themeNew';

const Auth = createStackNavigator();
const Main = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

const BottomTabNavigation = () => {
    return (
        <BottomTabs.Navigator
            initialRouteName={routes.home}
            detachInactiveScreens={true}
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
            }}
            tabBar={props => <CustomTabar {...props} />}>
            <BottomTabs.Screen
                name={routes.HOME_MY_AP}
                component={bottom.HomeScreenMyApp}
                options={{
                    tabBarLabel: 'Trang chủ',
                    tabBarIcon: 'home',
                    component: 'AntDesign',
                }}
            />

            <BottomTabs.Screen
                name={routes.READING_MY_APP}
                component={bottom.ReadingScreenMyApp}
                options={{
                    tabBarLabel: 'Đang đọc',
                    tabBarIcon: 'book-open-variant',
                    component: 'MaterialCommunityIcons',
                }}
            />

            <BottomTabs.Screen
                name={routes.CART_MY_AP}
                component={bottom.CartScreenMyApp}
                options={{
                    tabBarLabel: 'Giỏ hàng',
                    tabBarIcon: 'shopping-cart',
                    tabBarStyle: { display: 'none' },
                    component: 'Feather',
                }}
            />

            <BottomTabs.Screen
                name={routes.CHAT_MY_AP}
                component={bottom.ChatScreenMyApp}
                options={{
                    tabBarLabel: 'Nhắn tin',
                    tabBarIcon: 'chat',
                    tabBarStyle: { display: 'none' },
                    component: 'MaterialIcons',
                }}
            />

            <BottomTabs.Screen
                name={routes.MORE_MY_APP}
                component={bottom.MoreScreenMyApp}
                options={{
                    tabBarLabel: 'Cài đặt',
                    tabBarIcon: 'ios-settings-outline',
                    component: 'Ionicons',
                }}
            />
        </BottomTabs.Navigator>
    );
};

const screenOptionStyle = {
    headerShown: false,
};

export const RootNavigationNew = () => {
    const isLoginSelector = useAppSelector(state => state.root.auth.isLogin);
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const { colors } = useTheme(themeStore);

    // const dispatch = useAppDispatch();
    SplashScreen.hide();

    StatusBar.setBackgroundColor(colors.grey14);

    return (
        <NavigationContainer>
            {isLoginSelector ? (
                <Main.Navigator
                    initialRouteName={routes.HOME_MY_AP}
                    screenOptions={{
                        headerShown: false,
                        gestureEnabled: false,
                        cardStyleInterpolator:
                            CardStyleInterpolators.forHorizontalIOS,
                    }}>
                    <Main.Screen
                        name={routes.BOTTOM_TAB_MY_AP}
                        component={BottomTabNavigation}
                    />
                    <Main.Screen
                        name={routes.DETAIL_BOOK_MY_AP}
                        component={DetailBookScreenMyAp}
                    />
                    <Main.Screen
                        name={routes.PLAY_BOOK_MY_AP}
                        component={PlayBookScreenMyAp}
                    />
                    <Main.Screen
                        name={routes.BOOKS_BY_CATEGORY}
                        component={BooksByCategory}
                    />
                    <Main.Screen
                        name={routes.LISTEN_BOOK}
                        component={ListenBook}
                    />
                    <Main.Screen
                        name={routes.SCREEN_PAYMENT}
                        component={Payment}
                    />
                    <Main.Screen
                        name={routes.NOTIFICATION_SCREEN}
                        component={ScreenNotification}
                    />
                    <Main.Screen name={routes.SEARCH} component={Search} />
                    <Main.Screen
                        name={routes.DETAIL_CART}
                        component={DetailCart}
                    />
                    <Main.Screen
                        name={routes.PAYMENT_METHODS}
                        component={PaymentMethods}
                    />
                    <Main.Screen
                        name={routes.DETAIL_GROUP_CHAT_MY_APP}
                        component={DetailGroupChatMyApp}
                    />
                    <Main.Screen
                        name={routes.SCREEN_EDIT_SETTINGS}
                        component={EditMoreMyApp}
                    />
                    <Main.Screen
                        name={routes.THEME_MODE}
                        component={ScreenThemeMode}
                    />
                    <Main.Screen
                        name={routes.CHANGE_LANGUAGE}
                        component={ScreenChangeLanguage}
                    />
                    <Main.Screen
                        name={routes.PURCHASE_HISTORY}
                        component={ScreenPurchaseHistory}
                    />
                    <Main.Screen
                        name={routes.EDIT_PROFILE_SCREEN}
                        component={ScreenUpdateProfile}
                    />
                    <Main.Screen
                        name={routes.DETAIL_AUTHOR_MY_AP}
                        component={DetailAuthor}
                    />
                    <Main.Screen
                        name={routes.SEE_MORE}
                        component={SeeMoreScreen}
                    />
                </Main.Navigator>
            ) : (
                <Auth.Navigator
                    // initialRouteName={routes.WELCOME_SCREEN}
                    screenOptions={screenOptionStyle}>
                    <Auth.Screen
                        name={routes.WELCOME_SCREEN}
                        component={Welcome}
                    />
                    <Auth.Screen
                        name={routes.REGISTER_SCREEN}
                        component={Register}
                    />
                    <Auth.Screen name={routes.LOGIN_SCREEN} component={Login} />
                </Auth.Navigator>
            )}
        </NavigationContainer>
    );
};
