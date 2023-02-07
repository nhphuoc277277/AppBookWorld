import { Block, Text } from '@components';
import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { makeStyles, useTheme } from 'themeNew';
import { useAppSelector, useAppDispatch } from '@hooks';
import { withNamespaces } from 'react-i18next';
import { isEmpty } from 'lodash';
import { icons } from '@assets';

const BodyEditMoreMy = props => {
    const { name, email, image } = props;

    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const { colors } = useTheme(themeStore);
    const themeNew = useTheme(themeStore);
    const styles = useStyle(props, themeStore);

    return (
        <Block style={styles.container}>
            <Block
                width="90%"
                alignCenter
                radius={15}
                backgroundColor={colors.text}
                style={styles.shadowColor}>
                <Image
                    source={!isEmpty(image) ? { uri: image } : icons.logo}
                    style={styles.imageInformation}
                />
                <Text
                    size={20}
                    fontType={'bold1'}
                    color={themeNew.colors.textInBox}>
                    {isEmpty(name.trim()) ? 'Update name' : name}
                </Text>
                <Text
                    fontType="regular1"
                    fontSize={13}
                    color={themeNew.colors.textDark}>
                    {isEmpty(email.trim()) ? 'email@gmail.com' : email}
                </Text>
                <Block row marginVertical={15}>
                    <Image
                        style={styles.imageRank}
                        source={require('../../../../../assets/images/rank3.png')}
                    />
                    <Image
                        style={styles.imageRank}
                        source={require('../../../../../assets/images/rank2.png')}
                    />
                    <Image
                        style={styles.imageRank}
                        source={require('../../../../../assets/images/rank4.png')}
                    />
                    <Image
                        style={styles.imageRank}
                        source={require('../../../../../assets/images/rank1.png')}
                    />
                </Block>
            </Block>
        </Block>
    );
};

export default withNamespaces()(BodyEditMoreMy);

const useStyle = makeStyles()(({ colors }) => ({
    container: {
        marginTop: 25,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    itemUser: {
        width: '85%',
        height: 'auto',
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: colors.backgroundDark2,
    },
    imageInformation: {
        width: 144,
        height: 144,
        borderRadius: 15,
        marginVertical: 15,
    },
    imageRank: {
        width: 35,
        height: 35,
        borderRadius: 25,
        marginHorizontal: 15,
        marginBottom: 10,
    },
    shadowColor: {
        shadowColor: colors.textDark,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 4.65,
        elevation: 2,
    },
}));
