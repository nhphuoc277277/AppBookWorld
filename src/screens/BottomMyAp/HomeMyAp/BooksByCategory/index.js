import { Block, HeaderWithButton, Text } from '@components';
import { useAppSelector } from '@hooks';
import { useLazyGetAllBookByCategoryQuery } from '@redux/servicesNew';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from 'themeNew';
import ItemCateBook from '../HomeScreenMyAp/components/ItemCateBook';
import { withNamespaces } from 'react-i18next';
import EmptyIcon from '@assets/svgs/EmptyIcon';
const BooksByCategory = ({ route, t }) => {
    const { id, title } = route.params;
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const myInfo = useAppSelector(state => state.root.auth);
    const { colors } = useTheme(themeStore);

    const [getAllBookByCategory] = useLazyGetAllBookByCategoryQuery();
    const [data, setData] = useState([]);

    useEffect(async () => {
        const listBookByCategory = await getAllBookByCategory({
            token: myInfo.token,
            params: id,
        });
        setData(listBookByCategory.data);
    }, []);

    const renderEmty = useCallback(() => (
        <Block flex justifyCenter alignCenter>
            <EmptyIcon />
            <Text marginTop={10} color={colors.textInBox} fontType="medium1">
                {t('noBook')}
            </Text>
        </Block>
    ));

    return (
        <Block backgroundColor={colors.background} flex>
            <HeaderWithButton title={title} isBackHeader />
            {data.length > 0 ? (
                <ScrollView>
                    {data?.map((item, index) => (
                        <ItemCateBook key={item._id} item={item} />
                    ))}
                </ScrollView>
            ) : (
                renderEmty()
            )}
        </Block>
    );
};

const styles = StyleSheet.create({});

export default withNamespaces()(BooksByCategory);
