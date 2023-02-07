import React, { useState, useEffect } from 'react';
import { Block, Text } from '@components';
import {
    Platform,
    NativeModules,
    StatusBar,
    StyleSheet,
    Image,
} from 'react-native';
import Search from 'common/Search';
import { useAppSelector } from 'hooks';
import { makeStyles, useTheme } from 'themeNew';
const Header = ({ clicked, searchPhrase, setSearchPhrase, setClicked }) => {
    const [paddingTop, setPaddingTop] = useState(0);
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const theme = useTheme(themeStore);
    const styles = useStyle(themeStore);
    useEffect(() => {
        if (Platform.OS === 'ios') {
            NativeModules.StatusBarManager.getHeight(statusBarHeight => {
                const STATUS_BAR_HEIGHT = statusBarHeight.height;
                setPaddingTop(STATUS_BAR_HEIGHT);
            });
        } else {
            const STATUS_BAR_HEIGHT = StatusBar.currentHeight;
            setPaddingTop(STATUS_BAR_HEIGHT);
        }
    }, []);

    return (
        <Block
            backgroundColor={theme.colors.background}
            style={[styles.container, { paddingTop: paddingTop }]}>
            <Search
                clicked={clicked}
                setClicked={setClicked}
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                width={'90%'}
            />
            <Image
                source={{
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPAPdtQvHvvclT0AKfnXfxaKLhD9jjdmPfNA6N256edqM3AELzuS5_wA19ftromR5K76I&usqp=CAU',
                }}
                style={styles.avatar_iamge}
            />
        </Block>
    );
};

const useStyle = makeStyles()(({ normalize, colors }) => ({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        width: '90%',
        backgroundColor: colors.background,
    },
    searchBar__unclicked: {
        padding: 10,
        flexDirection: 'row',
        width: '95%',
        backgroundColor: '#d9dbda',
        borderRadius: 15,
        alignItems: 'center',
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        width: '90%',
    },
    avatar_iamge: {
        height: 25,
        width: 25,
        borderRadius: 20,
        marginLeft: 10,
    },
}));

export default Header;
