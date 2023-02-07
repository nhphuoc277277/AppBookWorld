import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import IconView from '@components/Icon';

const Evaluate = ({
    numStart,
    sizeIcon,
    children,
    marginIcon,
    colorIcon,
}) => {
    let starts = [];
    for (let i = 0; i < 5; i++) {
        starts.push(<IconView component={'AntDesign'} name={'star'} size={sizeIcon} color={colorIcon} />
        )
    }
    return (
        <View style={styles.container}>
            {starts}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
})

export default Evaluate;
