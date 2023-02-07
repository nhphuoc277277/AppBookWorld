import { Block, Button } from '@components';
import React, { useState, useEffect } from 'react';
import { RadioButton } from 'react-native-paper';
import { makeStyles, useTheme } from 'themeNew';
import { useAppSelector, useAppDispatch } from '@hooks';
import { changeLanguage } from '@redux/reducerNew';
import { withNamespaces } from 'react-i18next';

const BodyChangeLanguage = props => {
  const { t } = props;
  const dispatch = useAppDispatch();

  const themeStore = useAppSelector(state => state.root.themeApp.theme);
  const themeNew = useTheme(themeStore);
  const styles = useStyle(props, themeStore);

  const [value, setValue] = React.useState('vi');

  useEffect(() => {
    if (value === 'en') {
      dispatch(changeLanguage('en'));
    } else {
      dispatch(changeLanguage('vi'));
    }
  }, [value]);

  return (
    <Block marginHorizontal={5} marginVertical={10}>
      <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
        <RadioButton.Item
          label="Tiếng việt"
          value="vi"
          color={themeNew.colors.textDark}
          labelStyle={styles.textLabel}
          mode="ios"
        />
        <RadioButton.Item
          label="English"
          value="en"
          color={themeNew.colors.textDark}
          labelStyle={styles.textLabel}
          mode="ios"
        />
      </RadioButton.Group>
    </Block>
  );
};

export default withNamespaces()(BodyChangeLanguage);

const useStyle = makeStyles()(({ colors }) => ({
  textLabel: {
    color: colors.textDark,
    fontSize: 16,
  },
}));
