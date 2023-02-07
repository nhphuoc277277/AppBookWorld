import React from 'react';
import { Block, HeaderWithButton } from '@components';
import { ScrollView } from 'react-native';
import BodyChangeLanguage from './components/BodyChangeLanguage';
import HeaderChangeLanguage from './components/HeaderChangeLanguage';
import { makeStyles, useTheme } from 'themeNew';
import { useAppSelector, useAppDispatch } from '@hooks';
import { withNamespaces } from 'react-i18next';

const MoreMyApp = props => {
  const { t } = props;
  const themeStore = useAppSelector(state => state.root.themeApp.theme);
  const languageStore = useAppSelector(state => state.root.setting.language);
  const themeNew = useTheme(themeStore);
  return (
    <Block flex justifyCenter backgroundColor={themeNew.colors.background}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderWithButton isBackHeader title={t('language')} />
        <BodyChangeLanguage />
      </ScrollView>
    </Block>
  );
};

export default withNamespaces()(MoreMyApp);
