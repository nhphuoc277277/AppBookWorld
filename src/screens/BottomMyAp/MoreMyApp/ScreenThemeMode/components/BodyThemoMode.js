import { Block, Button, Text } from '@components';
import React, { useState, useEffect } from 'react';
import { RadioButton } from 'react-native-paper';
import { makeStyles, useTheme } from 'themeNew';
import { useAppSelector, useAppDispatch } from '@hooks';
import { changeTheme } from '@redux/reducerNew';
import { withNamespaces } from 'react-i18next';

const BodyThemeMode = props => {
    const { t } = props;
    const dispatch = useAppDispatch();

    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const themeNew = useTheme(themeStore);
    const styles = useStyle(props, themeStore);

    const [value, setValue] = React.useState(
        themeStore === 'light' ? 'off' : 'on',
    );

    return (
        <Block>
            <Block marginHorizontal={5} marginVertical={10}>
                <RadioButton.Group
                    onValueChange={value => {
                        setValue(value);
                        if (value === 'on') {
                            dispatch(changeTheme('dark'));
                        } else {
                            dispatch(changeTheme('light'));
                        }
                    }}
                    value={value}>
                    <RadioButton.Item
                        label={t('on')}
                        value="on"
                        labelStyle={styles.textLabel}
                        color={themeNew.colors.textDark}
                    />
                    <RadioButton.Item
                        label={t('off')}
                        value="off"
                        color={themeNew.colors.textDark}
                        labelStyle={styles.textLabel}
                    />
                    <RadioButton.Item
                        label={t('system')}
                        value="system"
                        color={themeNew.colors.textDark}
                        labelStyle={styles.textLabel}
                    />
                </RadioButton.Group>
            </Block>
        </Block>
    );
};

export default withNamespaces()(BodyThemeMode);

const useStyle = makeStyles()(({ colors }) => ({
    textLabel: {
        color: colors.textDark,
        fontSize: 16,
    },
}));
