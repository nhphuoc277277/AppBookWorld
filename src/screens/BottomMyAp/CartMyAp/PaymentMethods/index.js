import { Container, PaymentScreen } from '@components';
import { useAppSelector } from '@hooks';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'themeNew';

const PaymentMethods = ({ route }) => {
    let price = route.params.allPrice;
    const themeStore = useAppSelector(state => state.root.themeApp.theme);
    const { colors } = useTheme(themeStore);
    return (
        <Container
            statusColor={colors.background}
            edges={['left', 'right']}
            style={{ backgroundColor: colors.background }}>
            <PaymentScreen price={price} />
        </Container>
    );
};

export default PaymentMethods;

const styles = StyleSheet.create({
    checkBox: {
        width: 18,
        height: 18,
        borderWidth: 0.5,
        borderRadius: 9,
        marginTop: 15,
        marginRight: 10,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    icon: {
        width: 32,
        height: 32,
        borderRadius: 5,
    },
    icon1: {
        width: 36,
        height: 29,
        borderRadius: 5,
    },
    AllPay: {
        width: '95%',
        height: 70,
        paddingHorizontal: 5,
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginTop: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,

        elevation: 10,
    },
    Pay: {
        paddingLeft: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
