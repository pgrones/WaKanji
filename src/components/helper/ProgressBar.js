import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, StyleSheet, Text, View} from 'react-native';
import {useTheme} from "@react-navigation/native";

/**
 * Animated progress bar to display remaining time
 * @param duration Duration of the animation
 * @param delay Delay after which the animation starts
 * @param setRemainingTime Callback to send back the remaining time in order to calculate a score
 * @param onFinish Callback that executes whenever the time reaches 0
 * @param stop Stops the animation when true
 * @param text Text to display inside the progress bar e.g. a score
 */
export const ProgressBar = ({duration, delay, setRemainingTime, onFinish, stop, text}) => {
    const [progress, setProgress] = useState(100);
    const animation = useRef(new Animated.Value(100)).current;
    animation.addListener(({value}) => setProgress(value));

    const {colors, font} = useTheme();
    const style = getStyle(colors, font);

    // Starts the animation on the initial render
    useEffect(() => {
        Animated.timing(animation, {
            toValue: 0,
            easing: Easing.out(Easing.ease),
            duration: duration,
            delay: delay,
            useNativeDriver: true
        }).start(({finished}) => {
            if (finished) {
                onFinish();
            }
        });

        // To prevent memory leaks
        return () => animation.removeAllListeners();
    }, []);

    // Stops the animation and sends the remaining time back to the caller
    useEffect(() => {
        if (stop) {
            Animated.timing(
                animation, {useNativeDriver: true}
            ).stop();
            setRemainingTime(progress)
        }
    }, [stop]);

    return (
        <View style={style.progressBar}>
            <Animated.View style={[style.absoluteFill, {
                backgroundColor: animation.interpolate({
                    inputRange: [0, 50, 100],
                    outputRange: ['#f2291d', '#FF851B', '#2ECC40'],
                }),
                width: animation.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                }),
                top: animation.interpolate({
                    inputRange: [0, 10, 100],
                    outputRange: [15, 0, 0],
                }),
                bottom: animation.interpolate({
                    inputRange: [0, 10, 100],
                    outputRange: [15, 0, 0],
                })
            }]}/>
            <Text style={style.scoreText}>{text}</Text>
        </View>
    );
};

const getStyle = (colors, font) => {
    return StyleSheet.create({
        progressBar: {
            flex: 1,
            backgroundColor: colors.backgroundDark,
            borderRadius: 20,
            margin: 10,
            alignItems: 'center',
            justifyContent: 'center'
        },
        absoluteFill: {
            borderRadius: 20,
            position: 'absolute',
            left: 0,
            right: 0
        },
        scoreText: {
            color: colors.text,
            fontFamily: font.fontFamily,
            fontWeight: 'bold',
            fontSize: 24
        }
    })
};
