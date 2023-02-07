import React, { useCallback } from 'react';
import { Block, Container, HeaderWithButton } from '@components';
import { ScrollView, Animated } from 'react-native';
import Header from './components/Header';
import ChartMoreMy from './components/ChartMoreMy';
import BodyEditMoreMy from '../EditMoreMyApp/components/BodyEditMoreMy';
import ItemMoreMy from './components/ItemMoreMy';
import ItemLastMoreMy from './components/ItemLastMoreMy';
import { StatusBar } from 'react-native';

import { useAppSelector } from 'hooks';
import { makeStyles, useTheme } from 'themeNew';

const MoreMyApp = props => {
    const myInfo = useAppSelector(state => state.root.auth);
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const { colors } = useTheme(themeStore);

    // StatusBar.setBackgroundColor(themeNew.colors.grey14);
    return (
        <Container
            style={{ backgroundColor: colors.background, flex: 1 }}
            statusColor={colors.background}>
            <Header />
            <ScrollView showsVerticalScrollIndicator={false}>
                <BodyEditMoreMy
                    name={myInfo?.name}
                    image={myInfo?.image}
                    email={myInfo?.email}
                />
                <ItemMoreMy />
                <ChartMoreMy />
                <ItemLastMoreMy />
            </ScrollView>
        </Container>
    );
};

export default MoreMyApp;
