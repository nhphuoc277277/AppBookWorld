import { Block, Text, NoData } from '@components';
import React, { useCallback } from 'react';
import { Animated } from 'react-native';
import { makeStyles, useTheme } from 'themeNew';
import { withNamespaces } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '@hooks';
import ItemRank from './ItemRank';
import { useGetCountTop10Query } from '@redux/servicesNew';

const ItemLastMoreMy = ({ t }) => {
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const themeNew = useTheme(themeStore);
    const styles = useStyles(themeStore);
    const myInfo = useAppSelector(state => state.root.auth);

    useGetCountTop10Query(myInfo.token);
    const ranks = useAppSelector(state => state.root.rank.ranks);

    return ranks?.data?.length > 0 ? (
        <Block marginHorizontal={26}>
            <Text fontType={'bold1'} size={16} color={themeNew.colors.textDark}>
                {t('rank')}
            </Text>
            {ranks?.data.map((item, index) => (
                <ItemRank index={index} key={index} item={item} />
            ))}
        </Block>
    ) : (
        <NoData title={'Không có bảng xếp hạng'}></NoData>
    );
};

export default withNamespaces()(ItemLastMoreMy);

const useStyles = makeStyles()(({ colors }) => ({}));
