import React from 'react';
import { Block, HeaderWithButton } from '@components';
import { ScrollView } from 'react-native';
import HeaderThemeMode from './components/HeaderThemeMode';
import BodyThemeMode from './components/BodyThemoMode';
import { makeStyles, useTheme } from 'themeNew';
import { useAppSelector, useAppDispatch } from '@hooks';
import { withNamespaces } from 'react-i18next';

const MoreMyApp = props => {
  const { t } = props;
  const themeStore = useAppSelector(state => state.root.themeApp.theme);
  const themeNew = useTheme(themeStore);

  return (
    <Block flex justifyCenter backgroundColor={themeNew.colors.background}>
      <HeaderWithButton isBackHeader title={t('darkMode')} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <BodyThemeMode />
      </ScrollView>
    </Block>
  );
};

export default withNamespaces()(MoreMyApp);
