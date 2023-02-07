import React from 'react';
import { Block, HeaderWithButton } from '@components';
import { ScrollView } from 'react-native';
import HeaderPurchase from './components/HeaderPurchase';
import BodyPurchaseHistory from './components/BodyPurchaseHistory';
import { makeStyles, useTheme } from 'themeNew';
import { useAppSelector, useAppDispatch } from '@hooks';
import { withNamespaces } from 'react-i18next';

const MoreMyApp = props => {
  const { t } = props;
  const themeStore = useAppSelector(state => state.root.themeApp.theme);
  const themeNew = useTheme(themeStore);
  return (
    <Block flex justifyCenter backgroundColor={themeNew.colors.background}>
      <HeaderWithButton isBackHeader title={t('purchaseHistory')} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <BodyPurchaseHistory />
      </ScrollView>
    </Block>
  );
};

export default withNamespaces()(MoreMyApp);
