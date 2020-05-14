import React, {useEffect, useRef, useState} from "react";
import {Animated, Easing, StyleSheet, Text, View} from "react-native";
import {useTheme} from "@react-navigation/native";

/**
 * Countdown component that is currently unused
 */
export const CountDown = () => {
    const [progress, setProgress] = useState(3)
    const {colors, font} = useTheme();
    const style = getStyle(colors, font);
    const animation = useRef(new Animated.Value(3)).current;
    animation.addListener(({value}) => setProgress(value));

    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1,
            delay: 500,
            easing: Easing.out(Easing.ease),
            duration: 3000
        }).start();
        return () => animation.removeAllListeners();
    }, [])

    return (
        <View style={style.container}>
            <Text style={style.text}>{progress.toFixed(0)}</Text>
        </View>
    )
}

const getStyle = (colors, font) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 100
        },
        text: {
            fontSize: 100,
            fontFamily: font.fontFamily,
            color: colors.text
        }
    })
};
