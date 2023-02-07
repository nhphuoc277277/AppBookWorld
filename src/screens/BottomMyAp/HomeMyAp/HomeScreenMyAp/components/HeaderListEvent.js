import { Block, Text } from '@components';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '@theme';
import { useAppSelector } from '@hooks';
import { makeStyles, useTheme } from 'themeNew';
import { t } from 'i18next';

const { colors } = theme;

const HeaderListBook = ({ title, action }) => {
  const themeStore = useAppSelector(state => state.root.themeApp.theme);
  const theme = useTheme(themeStore);
  const styles = useStyle(themeStore);

  return (
    <Block row justifyContent={'space-between'} alignCenter marginLeft={12} marginTop={20}>
      <Text fontType='bold1' color={theme.colors.textInBox} style={styles.titleSection}>{title}</Text>
      {action && (
        <TouchableOpacity onPress={action}>
          <Text fontType='bold1' style={styles.titleViewAll}>{t('seeMore')}</Text>
        </TouchableOpacity>
      )}
    </Block>
  );
};

const useStyle = makeStyles()(({ normalize, colors }) => ({
  titleSection: {
    fontSize: 18,
  },
  titleViewAll: {
    color: colors.primary,
    marginRight: 10
  },
}));
export default HeaderListBook;
