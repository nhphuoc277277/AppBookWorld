import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import BottomTabMyAp from './BottomTabMyAp';
import Auth from '../screens/Auth';
import { useAppSelector, useAppDispatch } from 'hooks';
import { changeLanguage } from '@redux/reducerNew';
import SplashScreen from 'react-native-splash-screen';

export default function MainContainer() {
    const isLoginSelector = useAppSelector(state => state.root.auth.isLogin);
    const languageSelector = useAppSelector(
        state => state.root.setting.language,
    );

    const dispatch = useAppDispatch();
    SplashScreen.hide();
    React.useEffect(() => {
        dispatch(changeLanguage(languageSelector));
    }, []);

    return (
        <>
            <NavigationContainer>
                <StatusBar
                    translucent
                    barStyle="dark-content"
                    backgroundColor="transparent"
                />
                {!isLoginSelector ? <Auth /> : <BottomTabMyAp />}
            </NavigationContainer>
        </>
    );
}
