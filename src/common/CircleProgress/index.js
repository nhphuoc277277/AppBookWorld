import { useAppSelector } from '@hooks';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedProps,
    useDerivedValue,
} from 'react-native-reanimated';

import Svg, { Circle } from 'react-native-svg';

const BACKGROUND_COLOR = '#444B6F';
const BACKGROUND_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#A6E1FA';

const { width, height } = Dimensions.get('window');

const CIRCLE_LENGTH = 130; // 2PI*R
const R = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText = Animated.createAnimatedComponent(TextInput);

export default function CricleProgress() {
    const { progressInDay, target } = useAppSelector(
        state => state.root.reading,
    );

    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = target / progressInDay;
    }, [progressInDay]);

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
    }));

    const progressText = useDerivedValue(() => {
        return `${Math.floor(progress.value * 100)}`;
    });

    // useEffect(() => {
    //     progress.value = withTiming(progress.value > 0 ? 0 : 1, {
    //         duration: 10000,
    //     });
    // }, []);

    const animatedTextProps = useAnimatedProps(() => {
        return {
            text: `${progress.value}%`,
        };
    });
    return (
        <View style={styles.container}>
            <AnimatedText animatedProps={animatedTextProps} />
            <Svg style={{ position: 'absolute' }}>
                <AnimatedCircle
                    cx={width / 15.2}
                    cy={height / 33}
                    r={R}
                    stroke={STROKE_COLOR}
                    strokeWidth={5}
                    strokeDasharray={CIRCLE_LENGTH}
                    animatedProps={animatedProps}
                    strokeLinecap={'round'}
                />
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 55,
        width: 56,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 150,
        right: 50,
        backgroundColor: 'white',
        borderRadius: 100,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    progressText: {
        fontSize: 80,
        color: 'rgba(256,256,256,0.7)',
        width: 200,
        textAlign: 'center',
    },
    button: {
        // position: 'absolute',
        bottom: 80,
        width: width * 0.7,
        height: 60,
        backgroundColor: BACKGROUND_STROKE_COLOR,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 25,
        color: 'white',
        letterSpacing: 2.0,
    },
});
