import { Block, HeaderWithButton, TextInput } from '@components';
import IconView from '@components/Icon';
import { useAppDispatch, useAppSelector } from '@hooks';
import { saveSearchReducer } from '@redux/reducerNew';
import React, { useState } from 'react';
import { withNamespaces } from 'react-i18next';
import { makeStyles, useTheme } from 'themeNew';
import TabTopicSearch from './components/TabTopicSearch';
const Search = ({ t, route }) => {
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const { colors } = useTheme(themeStore);
    const [search, setSearch] = useState('');
    const [focus, setFocus] = useState(false);
    const styles = useStyle(themeStore);
    const dispatch = useAppDispatch();

    const renderIconLeft = () => (
        <Block marginRight={5}>
            <IconView
                component="Ionicons"
                name="ios-search-outline"
                color={colors.grey10}
                size={22}
            />
        </Block>
    );

    const saveSearch = () => {
        dispatch(
            saveSearchReducer({
                _id: Math.floor(Math.random() * 9999999),
                value: search,
            }),
        );
    };

    return (
        <Block backgroundColor={colors.background} flex>
            <HeaderWithButton title="Explore" isBackHeader />
            <TextInput
                placeholder={t('searchHere')}
                onSubmitEditing={() => setFocus(false)}
                onFocus={() => setFocus(true)}
                iconLeft={renderIconLeft}
                containerStyle={styles.containerSearch}
                style={[
                    focus ? styles.styleSearchFocus : styles.styleSearch,
                    { backgroundColor: colors.background },
                ]}
                value={search}
                onChangeText={setSearch}
                onEndEditing={saveSearch}
            />
            <TabTopicSearch search={search} setSearch={setSearch} />
        </Block>
    );
};

const useStyle = makeStyles()(({ normalize, colors }) => ({
    containerSearch: {
        marginHorizontal: 20,
    },
    styleSearch: {
        borderColor: colors.grey13,
        height: normalize(50)('moderate'),
    },
    styleSearchFocus: {
        borderWidth: 2,
        height: normalize(50)('moderate'),
    },
}));

export default withNamespaces()(Search);
