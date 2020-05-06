import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, StyleSheet, Text, View} from 'react-native';
import {useTheme} from "@react-navigation/native";

const ProgressBar = ({duration, delay, setWrapperProgress, onFinish, stop, text}) => {
    const [progress, setProgress] = useState(0)
    const {colors, font} = useTheme();
    const style = getStyle(colors, font);
    const animation = useRef(new Animated.Value(100)).current;
    animation.addListener(({value}) => setProgress(value));

    useEffect(() => {
        Animated.timing(animation, {
            toValue: 0,
            easing: Easing.out(Easing.ease),
            duration: duration,
            delay: 200 + delay
        }).start(({finished}) => {
            if (finished) {
                onFinish();
            }
        });
        return () => animation.removeAllListeners();
    }, []);

    useEffect(() => {
        if (stop) {
            Animated.timing(
                animation, {}
            ).stop();
            setWrapperProgress(progress)
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
                    inputRange: [0, 5, 100],
                    outputRange: [5, 0, 0],
                }),
                bottom: animation.interpolate({
                    inputRange: [0, 5, 100],
                    outputRange: [5, 0, 0],
                })
            }]}/>
            <Text style={style.scoreText}>{text}</Text>
        </View>
    );
};

export default ProgressBar

const getStyle = (colors, font) => {
    return StyleSheet.create({
        progressBar: {
            flex: 1,
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderWidth: 2,
            borderRadius: 10,
            margin: 10,
            alignItems: 'center',
            justifyContent: 'center'
        },
        absoluteFill: {
            borderRadius: 10,
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
